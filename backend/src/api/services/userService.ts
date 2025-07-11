import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel";
import Config from "../models/configModel";

dotenv.config();

export const fetchAllUsers = async () => {
  const users = await User.findAll({
    attributes: [
      "id",
      "email",
      "section",
      "about_me",
      "birthdate",
      "street",
      "city",
      "state",
      "zip",
      "created_at",
    ],
    order: [["created_at", "DESC"]],
  });

  return users;
};

export const handleAuthService = async (email: string, password: string): Promise<{ token: string; userId: string; section: number; }> => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const lastSection: number = await Config.max("section");

    if (user.section > lastSection) {
      throw new Error("completed");
    }

    const valid: boolean = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("invalid");
    }

    const token: string = jwt.sign(
      { userId: user.id },
      process.env["JWT_SECRET"] as string,
      {
        expiresIn: "1d",
      }
    );

    return { token, userId: user.id, section: user.section };
  } else {
    const hashed: string = await bcrypt.hash(password, 10);
    const newUser: User = await User.create({ email, password: hashed });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env["JWT_SECRET"] as string,
      {
        expiresIn: "1d",
      }
    );

    return { token, userId: newUser.id, section: newUser.section };
  }
};

export const saveOnboardingSection = async (
  userId: string,
  section: number,
  body: Record<string, any>
) => {
  const lastSection: number = await Config.max("section");

  if (section > lastSection) {
    throw new Error("invalid_section");
  }

  const configRows = await Config.findAll({
    where: { section },
    attributes: ["component"],
  });

  const allowedComponents = configRows.map((row) => row.component);
  const updates: Record<string, any> = {};

  for (const key of Object.keys(body)) {
    if (
      allowedComponents.includes(key) &&
      body[key] !== undefined &&
      body[key] !== null
    ) {
      updates[key] = body[key];
    }
  }

  if (allowedComponents.includes("address")) {
    const { street, city, state, zip } = body;
    if (street) updates["street"] = street;
    if (city) updates["city"] = city;
    if (state) updates["state"] = state;
    if (zip) updates["zip"] = zip;
  }

  if (Object.keys(updates).length === 0) {
    throw new Error("no_valid_fields");
  }

  updates["section"] = section + 1;

  await User.update(updates, { where: { id: userId } });

  return Object.keys(updates);
};
