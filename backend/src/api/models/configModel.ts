import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

interface ConfigAttributes {
  component: string;
  section: number;
}

export class Config
  extends Model<ConfigAttributes>
  implements ConfigAttributes
{
  public component!: string;
  public section!: number;
}

Config.init(
  {
    component: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    section: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "config",
    timestamps: false, // This table doesn’t have created_at or updated_at
  }
);

export default Config;
