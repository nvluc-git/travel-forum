import db from "../database/models";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";

export const getComments = (articleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const comments = await db.Comments.findAll({
        include: [{ model: db.Accounts, attributes: [], as: "accountData" }],
        where: { articleId: articleId },
        attributes: [
          "id",
          "content",
          "createdAt",
          [Sequelize.col("accountData.username"), "user"],
          [Sequelize.col("accountData.avatar"), "avatar"],
          [Sequelize.col("accountData.id"), "userId"],
        ],
        order: [["id", "DESC"]],
        raw: false,
      });

      resolve(response(mes.GET_SUCCESSFULLY, comments));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const newComment = (userId, articleId, { contentCmt }) =>
  new Promise(async (resolve, reject) => {
    try {
      const getArticleId = await db.Articles.findOne({
        where: { id: articleId },
      });
      const getUserId = await db.Accounts.findOne({
        where: { id: userId },
      });

      if (!getArticleId) {
        resolve(response("article not found", false));
        return;
      }
      if (!getUserId) {
        resolve(response("user not found", false));
        return;
      }
      await db.Comments.create({
        content: contentCmt,
        accountId: getUserId.id,
        articleId: getArticleId.id,
      });
      const styles = `style="text-decoration: none; font-weight: bold; color: black"`;
      const linkUser = `${process.env.CLIENT_URL}/personal/${getUserId.id}`;
      const linkArticle = `${process.env.CLIENT_URL}/detail/${getArticleId.id}`;
      await db.Notis.create({
        content: ` <a ${styles} href="${linkUser}">${getUserId.username}</a> commented on your <a ${styles} href="${linkArticle}">${getArticleId.title}</a> article`,
        accountId: getArticleId.accountId,
      });
      resolve(response(mes.CREATE_SUCCESS, true));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const removeComment = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const comment = await db.Comments.findOne({
        include: [{ model: db.Accounts, attributes: [], as: "accountData" }],
        where: { id },
        attributes: [
          "id",
          "content",
          "createdAt",
          [Sequelize.col("accountData.username"), "user"],
          [Sequelize.col("accountData.avatar"), "avatar"],
          [Sequelize.col("accountData.id"), "userId"],
        ],
        raw: false,
      });
      if (!comment) return resolve(response(mes.DELETE_FAILED, false));

      await db.Comments.destroy({
        raw: false,
        where: { id: id },
      });
      resolve(response(mes.DELETE_SUCCESS, true));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
