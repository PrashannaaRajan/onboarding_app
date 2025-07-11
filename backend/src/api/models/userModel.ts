import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db"; // your Sequelize instance

// Define TypeScript types for model attributes
interface UserAttributes {
  id: string;
  email: string;
  password: string;
  section?: number;
  about_me?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: Date;
  created_at?: Date;
}

// Optional fields for creation (handled by defaults)
type UserCreationAttributes = Optional<
  UserAttributes,
  | "id"
  | "section"
  | "about_me"
  | "street"
  | "city"
  | "state"
  | "zip"
  | "birthdate"
  | "created_at"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public email!: string;
  public password!: string;
  public section!: number;
  public about_me?: string;
  public street?: string;
  public city?: string;
  public state?: string;
  public zip?: string;
  public birthdate?: Date;
  public created_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // generates UUID using Sequelize
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    section: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
    about_me: {
      type: DataTypes.TEXT,
    },
    street: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.TEXT,
    },
    zip: {
      type: DataTypes.TEXT,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false, // because you're manually defining `created_at`
  }
);

export default User;
