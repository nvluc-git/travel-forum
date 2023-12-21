import db from "../database/models";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";

export const onBookmark = (accountId, articleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const getArticleId = await db.Articles.findOne({
        where: { id: articleId },
      });
      const getAccountId = await db.Accounts.findOne({
        where: { id: accountId },
      });
      if (!getArticleId) return resolve(response("Article not found"));
      if (!getAccountId) return resolve(response("Account not found"));

      const found = await db.Bookmarks.findOne({
        raw: false,
        include: [
          { model: db.Accounts, attributes: [], as: "accountData" },
          { model: db.Articles, attributes: [], as: "articleData" },
        ],
        where: { articleId, accountId },
      });
      if (!found) {
        await db.Bookmarks.create({
          articleId: getArticleId.id,
          accountId: getAccountId.id,
        });

        return resolve(response("You have saved the article", true));
      } else {
        await db.Bookmarks.destroy({
          raw: false,
          where: { articleId, accountId },
        });

        return resolve(response("You have unsaved the article", false));
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getBookmark = (accountId) =>
  new Promise(async (resolve, reject) => {
    try {
      const bookmark = await db.Bookmarks.findAll({
        include: [
          {
            model: db.Articles,
            attributes: [],
            as: "articleData",
          },
        ],
        where: { accountId },
        attributes: [
          [Sequelize.col("articleData.title"), "title"],
          [Sequelize.col("articleData.id"), "idArticle"],
          [Sequelize.col("articleData.image"), "image"],
        ],
        order: [["id", "DESC"]],
        raw: false,
      });

      resolve(response(mes.GET_SUCCESSFULLY, bookmark));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
