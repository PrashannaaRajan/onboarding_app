import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env["DATABASE_URL"] || "", {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to true if you have a valid CA cert
    },
  },
});
