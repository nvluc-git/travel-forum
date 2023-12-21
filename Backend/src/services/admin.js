import db from "../database/models";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";
import { sendMail } from "../utils/mailer";
const cloudinary = require("cloudinary").v2;

export const getAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await db.Accounts.findAll({
        raw: false,
        where: { roleId: 2 },
        include: [{ model: db.Roles, attributes: [], as: "roleData" }],
        attributes: [
          "id",
          "username",
          "email",
          "status",
          "createdAt",
          [Sequelize.col("roleData.name"), "role"],
        ],
      });
      resolve(respon);
    } catch (error) {
      reject(error);
    }
  });

export const bannedUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.Accounts.findOne({
        where: { id },
      });

      if (!user) {
        return resolve(response(mes.USER_NOT_FOUND));
      }
      if (user.status === 1) {
        await db.Accounts.update(
          { status: 0 },
          {
            where: { id },
          }
        );
        return resolve(response("User has been Banned", true));
      } else {
        await db.Accounts.update(
          { status: 1 },
          {
            where: { id },
          }
        );
        return resolve(response("User has been Unbanned", false));
      }
    } catch (error) {
      reject(error);
    }
  });

export const sendMessToUser = (adminId, userId, { content }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const admin = await db.Accounts.findOne({
        where: { id: adminId },
      });

      const user = await db.Accounts.findOne({
        where: { id: userId },
      });

      if (!admin && !user) {
        cloudinary.uploader.destroy(fileData.filename);
        return resolve(response("send false"));
      }
      await db.Notis.create({
        content: `The system has sent a notification to your email`,
        accountId: user.id,
      });

      if (!fileData) {
        await sendMail(
          user.email,
          "Notifications from the system",
          `<div>
          <div>
            <h3>Hi, ${user.username}</h3>
            <p style="line-height: 25px; text-align: start">${content}</p>
          </div>
         
        </div>`
        );
      }

      if (fileData) {
        await sendMail(
          user.email,
          "Notifications from the system",
          `<div>
          <div>
            <h3>Hi, ${user.username}</h3>
            <p style="line-height: 25px; text-align: start">${content}</p>
          </div>
          <div style="margin-top: 20px">
            <img
              src="${fileData.path}"
              style="
                height: 300px;
                width: 500px;
                border-radius: 10px;
                object-fit: cover;
              "
            />
          </div>
        </div>`
        );
      }

      resolve(response("send message success"));
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

export const deleteUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Accounts.findOne({
        where: { id },
      });
      const filename = data.filename;

      const data2 = await db.Articles.findAll({
        where: { accountId: data.id },
      });

      if (!data) return resolve(response("user not found"));

      const imageArrArticle = data2.map((values) => {
        return values.filename;
      });

      await db.Bookmarks.destroy({
        where: { accountId: data.id },
      });
      await db.Notis.destroy({
        raw: false,
        where: { accountId: data.id },
      });
      await db.Comments.destroy({
        raw: false,
        where: { accountId: data.id },
      });

      await db.Likes.destroy({
        raw: false,
        where: { accountId: data.id },
      });

      await db.Articles.destroy({
        where: { accountId: data.id },
      });

      await db.Accounts.destroy({
        where: { id },
      });
      resolve(response(mes.DELETE_SUCCESS));
      cloudinary.api.delete_resources(imageArrArticle);
      cloudinary.api.delete_resources(filename);
    } catch (error) {
      reject(error);
    }
  });

export const getAllService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await db.Services.findAll({
        raw: false,
        attributes: [
          "id",
          "title",
          "image",
          "linkTo",
          "createdAt",
          "updatedAt",
        ],
      });
      resolve(respon);
    } catch (error) {
      reject(error);
    }
  });

export const getOneService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await db.Services.findOne({
        raw: false,
        where: { id },
        attributes: [
          "id",
          "title",
          "image",
          "linkTo",
          "createdAt",
          "updatedAt",
        ],
      });
      resolve(respon);
    } catch (error) {
      reject(error);
    }
  });

// create
export const createService = (accountId, { title, linkTo, image }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      let data = { title, linkTo, image };

      const user = await db.Accounts.findOne({
        where: { id: accountId },
      });

      if (!user) {
        cloudinary.uploader.destroy(fileData.filename);
        return response(mes.CREATE_FAIL);
      }

      data.accountId = user.id;
      data.image = fileData.path;
      data.filename = fileData.filename;
      await db.Services.create(data);
      resolve(response(mes.INSERT_SUCCESSFULY, data));
      if (fileData && !data) cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

// update
export const updateService = ({ id, ...data }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        data.image = fileData?.path;
        data.filename = fileData?.filename;
      }
      const res = await db.Services.update(data, {
        where: { id: id },
      });
      // sử dụng update() sẽ trả về mảng => res[] (res[0] là false - không tìm được id, res[1] là update thành công)
      if (res[0] === 0) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return resolve(response("The service does not exist", id));
      }

      resolve(response(mes.UPDATE_SUCCESS, data));
    } catch (error) {
      console.log(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      reject(error);
    }
  });

//delete
export const deleteService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Services.findOne({
        where: { id },
      });
      const filename = data.filename;

      if (!data) {
        return resolve(response(mes.DELETE_FAILED));
      }

      await db.Services.destroy({
        raw: false,
        where: { id },
      });

      resolve(response(mes.DELETE_SUCCESS));
      cloudinary.api.delete_resources(filename);
    } catch (error) {
      reject(error);
    }
  });

export const removeArticle = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Articles.findOne({
        where: { id },
      });
      const filename = data.filename;

      if (!data) {
        return resolve(response(mes.DELETE_FAILED, false));
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

      resolve(response(mes.DELETE_SUCCESS, true));
      cloudinary.api.delete_resources(filename);
    } catch (error) {
      reject(error);
    }
  });
