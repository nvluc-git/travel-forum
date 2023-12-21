import db from "../database/models";
export const getAllCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Categories.findAll({});
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
