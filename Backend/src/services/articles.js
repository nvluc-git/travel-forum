import db from "../database/models";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";
const cloudinary = require("cloudinary").v2;
//get all
export const getAllArticle = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findAll({
        raw: false,
        include: [
          { model: db.Categories, attributes: [], as: "categoryData" },
          { model: db.Types, attributes: [], as: "typeData" },
          { model: db.Accounts, attributes: [], as: "accountData" },
          { model: db.Likes, attributes: ["accountId"] },
          { model: db.Comments, attributes: ["content"] },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
          [Sequelize.col("accountData.username"), "user"],
        ],
        order: [["id", "DESC"]],
      });

      resolve(response(mes.GET_SUCCESSFULLY, data));
    } catch (error) {
      reject(error);
    }
  });

//get one
export const getOneArticle = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await db.Articles.findOne({
        where: { id: id },
        raw: false,
        include: [
          { model: db.Categories, attributes: ["id"], as: "categoryData" },
          { model: db.Types, attributes: ["id"], as: "typeData" },
          { model: db.Accounts, attributes: ["id"], as: "accountData" },
          { model: db.Likes, attributes: ["accountId"] },
          { model: db.Comments, attributes: ["content"] },
          { model: db.Bookmarks, attributes: ["accountId"] },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
          [Sequelize.col("accountData.username"), "user"],
          [Sequelize.col("accountData.id"), "userId"],
        ],
        order: [["id", "DESC"]],
      });
      if (!respon) {
        return resolve(response(mes.GET_FAIL, false));
      }

      resolve(response(mes.GET_SUCCESSFULLY, respon));
    } catch (error) {
      reject(error);
    }
  });
// get by user
export const getArticleByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.Accounts.findOne({
        where: { id },
      });

      if (!user) {
        return resolve(response(mes.USER_NOT_FOUND));
      }
      const articlesUser = await db.Articles.findAll({
        where: { accountId: id },
        raw: false,
        include: [
          { model: db.Categories, attributes: [], as: "categoryData" },
          { model: db.Types, attributes: [], as: "typeData" },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
        ],
      });
      if (!articlesUser) return resolve(response("not found"));

      resolve(response(mes.GET_SUCCESSFULLY, articlesUser));
    } catch (error) {
      reject(error);
    }
  });

// get by post
export const getArticleByPost = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findAll({
        raw: false,
        where: { typeId: 1 },
        include: [
          { model: db.Categories, attributes: [], as: "categoryData" },
          { model: db.Types, attributes: [], as: "typeData" },
          { model: db.Accounts, attributes: [], as: "accountData" },
          { model: db.Likes, attributes: ["accountId"] },
          { model: db.Comments, attributes: ["content"] },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
          [Sequelize.col("accountData.username"), "user"],
          [Sequelize.col("accountData.id"), "userId"],
        ],
        order: [["id", "DESC"]],
      });

      resolve(response(mes.GET_SUCCESSFULLY, data));
    } catch (error) {
      reject(error);
    }
  });
// get by question
export const getArticleByQuestion = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findAll({
        raw: false,
        where: { typeId: 2 },
        include: [
          { model: db.Categories, attributes: [], as: "categoryData" },
          { model: db.Types, attributes: [], as: "typeData" },
          { model: db.Accounts, attributes: [], as: "accountData" },
          { model: db.Likes, attributes: ["accountId"] },
          { model: db.Comments, attributes: ["content"] },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
          [Sequelize.col("accountData.username"), "user"],
          [Sequelize.col("accountData.avatar"), "avatar"],
          [Sequelize.col("accountData.id"), "userId"],
        ],
        order: [["id", "DESC"]],
      });

      resolve(response(mes.GET_SUCCESSFULLY, data));
    } catch (error) {
      reject(error);
    }
  });

// get post user
export const getPostUser = (accountId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findAll({
        raw: false,
        where: { typeId: 1, accountId },
        include: [
          { model: db.Categories, attributes: [], as: "categoryData" },
          { model: db.Types, attributes: [], as: "typeData" },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          "updatedAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
        ],
        order: [["id", "DESC"]],
      });

      resolve(response(mes.GET_SUCCESSFULLY, data));
    } catch (error) {
      reject(error);
    }
  });
// get question user
export const getQuestionUser = (accountId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findAll({
        raw: false,
        where: { typeId: 2, accountId },
        include: [
          { model: db.Categories, attributes: [], as: "categoryData" },
          { model: db.Types, attributes: [], as: "typeData" },
        ],
        attributes: [
          "id",
          "title",
          "subTitle",
          "content",
          "image",
          "createdAt",
          [Sequelize.col("categoryData.name"), "category"],
          [Sequelize.col("typeData.name"), "type"],
        ],
        order: [["id", "DESC"]],
      });

      resolve(response(mes.GET_SUCCESSFULLY, data));
    } catch (error) {
      reject(error);
    }
  });

// create
export const createArticle = (
  accountId,
  { title, subTitle, content, image, categoryId, typeId },
  fileData
) =>
  new Promise(async (resolve, reject) => {
    try {
      let data = { title, subTitle, content, image };

      const category = await db.Categories.findOne({
        where: { id: categoryId },
      });
      const type = await db.Types.findOne({
        where: { id: typeId },
      });
      const user = await db.Accounts.findOne({
        where: { id: accountId },
      });

      if (!category && !type && !user) {
        cloudinary.uploader.destroy(fileData.filename);
        return response(mes.CREATE_FAIL);
      }

      data.categoryId = category.id;
      data.typeId = type.id;
      data.accountId = user.id;
      data.image = fileData.path;
      data.filename = fileData.filename;
      await db.Articles.create(data);
      resolve(response(mes.INSERT_SUCCESSFULY, data));
      if (fileData && !data) cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

// update
export const updateArticle = ({ articleId, ...data }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        data.image = fileData?.path;
        data.filename = fileData?.filename;
      }
      const res = await db.Articles.update(data, {
        where: { id: articleId },
      });
      // sử dụng update() sẽ trả về mảng => res[] (res[0] là false - không tìm được id, res[1] là update thành công)
      if (res[0] === 0) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return resolve(response("The article does not exist", articleId));
      }

      resolve(response(mes.UPDATE_SUCCESS, data));
    } catch (error) {
      console.log(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      reject(error);
    }
  });

//delete
export const deleteArticle = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findOne({
        where: { id },
      });
      const filename = data.filename;

      if (!data) {
        return resolve(response(mes.DELETE_FAILED));
      }

      await db.Notis.destroy({
        raw: false,
        where: { articleId: id },
      });
      await db.Comments.destroy({
        raw: false,
        where: { articleId: id },
      });

      await db.Likes.destroy({
        raw: false,
        where: { articleId: id },
      });
      await db.Bookmarks.destroy({
        raw: false,
        where: { articleId: id },
      });
      await db.Articles.destroy({
        raw: false,
        where: { id },
      });

      resolve(response(mes.DELETE_SUCCESS));
      cloudinary.api.delete_resources(filename);
    } catch (error) {
      reject(error);
    }
  });
