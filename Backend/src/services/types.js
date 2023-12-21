import db from "../database/models";
export const getAllType = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Types.findAll({});
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
