import db from "../database/models";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";

export const actionLikes = (accountId, articleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const getArticleId = await db.Articles.findOne({
        raw: false,
        include: [
          { model: db.Accounts, attributes: ["email"], as: "accountData" },
        ],
        where: { id: articleId },
      });
      const getAccountId = await db.Accounts.findOne({
        where: { id: accountId },
      });
      if (!getArticleId) return resolve(response("Article not found"));
      if (!getAccountId) return resolve(response("Account not found"));

      const found = await db.Likes.findOne({
        raw: false,
        include: [
          { model: db.Accounts, attributes: [], as: "accountData" },
          { model: db.Articles, attributes: [], as: "articleData" },
        ],
        where: { articleId, accountId },
        attributes: ["createdAt"],
      });
      const styles = `style="text-decoration: none; font-weight: bold; color: black"`;
      const linkUser = `${process.env.CLIENT_URL}/personal/${getAccountId.id}`;
      const linkArticle = `${process.env.CLIENT_URL}/detail/${getArticleId.id}`;
      if (!found) {
        await db.Likes.create({
          articleId: getArticleId.id,
          accountId: getAccountId.id,
        });

        await db.Notis.create({
          articleId: getArticleId.id,
          accountId: getArticleId.accountId,
          content: `<a ${styles} href="${linkUser}">${getAccountId.username}</a> liked your <a ${styles} href="${linkArticle}">${getArticleId.title}</a> article`,
        });
        return resolve(response("Liked the post", true));
      } else {
        await db.Likes.destroy({
          raw: false,
          where: { articleId, accountId },
        });
        return resolve(response("Unlike the post"));
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getLikes = (articleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const Like = await db.Likes.findAll({
        include: [{ model: db.Accounts, attributes: [], as: "accountData" }],
        where: { articleId: articleId },
        attributes: [
          "createdAt",
          [Sequelize.col("accountData.username"), "user"],
          [Sequelize.col("accountData.id"), "userId"],
          [Sequelize.col("accountData.avatar"), "avatarUser"],
        ],
        order: [["id", "DESC"]],
        raw: false,
      });

      resolve(response(mes.GET_SUCCESSFULLY, Like));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
