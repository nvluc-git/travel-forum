import db from "../database/models";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";

export const getNotis = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const Notis = await db.Notis.findAll({
        where: { accountId: id },
        attributes: ["content", "createdAt"],
        order: [["id", "DESC"]],
        raw: false,
      });

      resolve(response(mes.GET_SUCCESSFULLY, Notis));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
