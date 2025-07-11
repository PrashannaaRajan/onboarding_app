import Config from "../models/configModel";

export const fetchConfig = async () => {
  return await Config.findAll({
    attributes: ["component", "section"],
  });
};

export const updateConfigSection = async (
  updates: { component: string; section: number }[]
) => {
  const transaction = await Config.sequelize!.transaction();

  try {
    for (const item of updates) {
      await Config.update(
        { section: item.section },
        { where: { component: item.component }, transaction }
      );
    }

    await transaction.commit();
    return { success: true };
  } catch (err) {
    await transaction.rollback();
    throw new Error("Failed to update configuration");
  }
};
