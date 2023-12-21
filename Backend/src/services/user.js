import db from "../database/models";
import Sequelize from "sequelize";
import { mes, response } from "../config/common";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/mailer";

const cloudinary = require("cloudinary").v2;
const hashHandle = (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(8));

export const getCurrentUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Accounts.findOne({
        where: { id: id },
        raw: false,
        include: [{ model: db.Roles, attributes: [], as: "roleData" }],

        attributes: [
          "id",
          "username",
          "email",
          "avatar",
          "firstname",
          "lastname",
          "birthday",
          "gender",
          "phonenumber",
          "address",
          "status",
          [Sequelize.col("roleData.name"), "role"],
        ],
      });
      if (!data) {
        return resolve(response(mes.USER_NOT_FOUND));
      }
      resolve(response(mes.GET_SUCCESSFULLY, data));
    } catch (error) {
      reject(error);
    }
  });

// personal
export const getOneAccount = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Accounts.findOne({
        where: { id: id },
        raw: false,
        include: [
          { model: db.Roles, attributes: [], as: "roleData" },
          { model: db.Articles, attributes: ["accountId"] },
          { model: db.Comments, attributes: ["accountId"] },
          { model: db.Likes, attributes: ["accountId"] },
        ],

        attributes: [
          "id",
          "username",
          "email",
          "avatar",
          "firstname",
          "lastname",
          "birthday",
          "gender",
          "phonenumber",
          "address",
          "status",
          [Sequelize.col("roleData.name"), "role"],
        ],
      });
      if (!data) {
        return resolve(response(mes.USER_NOT_FOUND, false));
      }
      const articleUser = await db.Articles.findAll({
        raw: false,
        where: { accountId: id },
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
      resolve(
        response(mes.GET_SUCCESSFULLY, {
          user: data,
          article: articleUser,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

export const updateUser = (id, data, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        data.avatar = fileData?.path;
        data.filename = fileData?.filename;
      }

      const res = await db.Accounts.update(data, {
        where: { id: id },
      });
      if (res[0] === 0) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return resolve(response("The user does not exist", false));
      }
      resolve(response(mes.UPDATE_SUCCESS, true));
    } catch (error) {
      reject(error);
    }
  });

export const changePass = (id, { curPass, newPass }) =>
  new Promise(async (resolve, reject) => {
    try {
      const findUser = await db.Accounts.findOne({
        where: { id },
      });

      const matched = bcrypt.compareSync(curPass, findUser.password);

      if (matched === false)
        return resolve(response("current password incorrect", false));

      const newPassword = hashHandle(newPass);
      await db.Accounts.update(
        { password: newPassword },
        {
          where: { id },
        }
      );

      resolve(response(mes.UPDATE_SUCCESS, true));
    } catch (error) {
      reject(error);
    }
  });

export const rpArticle = (userRp, articleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const findUserRp = await db.Accounts.findOne({
        where: { id: userRp },
      });

      const findAdmin = await db.Accounts.findOne({
        where: { email: "hph.hoanghong1@gmail.com" },
      });

      const findArticle = await db.Articles.findOne({
        where: { id: articleId },
      });

      if (!findUserRp && !findAdmin && !findArticle) {
        return resolve(response("Report false", false));
      }
      const styles = `style="text-decoration: none; font-weight: bold; color: black"`;
      const linkUser = `${process.env.CLIENT_URL}/personal/${findUserRp.id}`;
      const linkArticle = `${process.env.CLIENT_URL}/detail/${findArticle.id}`;
      await db.Notis.create({
        content: `<a ${styles} href="${linkUser}">${findUserRp.username}</a> reported the article  <a ${styles} href="${linkArticle}">${findArticle.title}</a> violated the terms of use`,
        accountId: findAdmin.id,
      });

      resolve(response("Report the article successfully", true));
    } catch (error) {
      reject(error);
    }
  });

export const rp_user = (userSend, rpUser, { content }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const admin = await db.Accounts.findOne({
        where: { email: "hph.hoanghong1@gmail.com" },
      });

      const accSend = await db.Accounts.findOne({
        where: { id: userSend },
      });

      const rpAcc = await db.Accounts.findOne({
        where: { id: rpUser },
      });

      if (!admin && !accSend && !rpAcc) {
        cloudinary.uploader.destroy(fileData.filename);
        return resolve(response("send false"));
      }
      await db.Notis.create({
        content: "The system has sent a notification to your email",
        accountId: admin.id,
      });

      if (!fileData) {
        await sendMail(
          admin.email,
          "User send report",
          `<div>
          
          <p>${accSend.username} (${accSend.email}) discovered that ${rpAcc.username} (${rpAcc.email}) was acting against the terms of use.</p>
          <p style="line-height: 25px; text-align: start">Specifically, ${content}</p>
          

        </div>`
        );
      }

      if (fileData) {
        await sendMail(
          admin.email,
          "User send report",
          `<div>
          <div>
          <p>${accSend.username} (${accSend.email}) discovered that ${rpAcc.username} (${rpAcc.email}) was acting against the terms of use.</p>

            <p style="line-height: 25px; text-align: start">Specifically, ${content}</p>
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

      resolve(response("Report user success"));
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

export const userGetService = () =>
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
