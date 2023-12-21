import db from "../database/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mes, response } from "../config/common";
import Sequelize from "sequelize";
import { sendMail } from "../utils/mailer";

const hashHandle = (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(8));

export const register = ({ email, password, username }) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenEmail = Math.random().toString(36).substring(2);
      const verificationToken = jwt.sign(
        {
          tokenEmail,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const checkData = await db.Accounts.findOne({
        where: { email: email },
      });
      const role = await db.Roles.findOne({ where: { name: "User" } });

      if (!role) {
        resolve(response(mes.REGISTER_FAIL_ROLE, false));
        return;
      }
      if (checkData) {
        resolve(response(mes.REGISTER_FAIL_EXIST, false));
        return;
      }
      await db.Accounts.create({
        email: email,
        password: hashHandle(password),
        username: username,
        avatar:
          "https://res.cloudinary.com/din7kzrj4/image/upload/v1701415677/test-be/avatar_wkfwo5.png",
        roleId: role.id,
        verificationToken: verificationToken,
        isVerified: false,
        status: false,
      });
      await sendMail(
        email,
        "Account Verification",
        `
        <div style="padding: 10px">
        <h1>Hi, ${username}</h1>
        <p style="color:black">
          You are just one step away from creating your account on VIVU. Click on
          the button below to confirm your email address and get started.
        </p>
    
        <div style="text-align: center">
          <a
            href="${process.env.CLIENT_URL}/verify-email/${verificationToken}"
            style="
              background-color: #04364a;
              padding: 10px;
              border-radius: 5px;
              border: none;
              color: white;
              text-decoration: none;
            "
            >Confirm E-Mail Address</a
          >
        </div>
        </div>
        `
      );
      resolve(response(mes.REGISTER_SUCCESSFULY, { email, username }));
    } catch (error) {
      reject(error);
    }
  });

export const verifyEmail = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Accounts.update(
        { isVerified: true, verificationToken: null, status: true },
        { where: { verificationToken: token } }
      );
      if (data[0] > 0) {
        return resolve(response(mes.EMAIL_SUCCESS, true));
      } else {
        return resolve(response(mes.EMAIL_FALED, false));
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.Accounts.findOne({
        where: { email: email },
        include: {
          model: db.Roles,
          attributes: [],
          as: "roleData",
        },
        attributes: [
          "id",
          "username",
          "email",
          "password",
          "avatar",
          "isVerified",
          "status",
          [Sequelize.col("roleData.name"), "role"],
        ],
        raw: true,
      });

      if (!data) {
        resolve(response(mes.ACCOUNT_NOT_FOUND, false));
        return;
      }

      const isChecked = bcrypt.compareSync(password, data.password);
      if (isChecked === false) {
        resolve(response(mes.INCORRECT_PASS, false));
        return;
      }

      if (data.isVerified === 0)
        return resolve(response(mes.ACCOUNT_NOT_VERIFIED, false));

      if (data.status === 0)
        return resolve(response(mes.ACCOUNT_BANNED, false));

      const token = jwt.sign(
        {
          id: data.id,
          email: data.email,
          role: data.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      resolve(response(mes.LOGIN_SUCCESSFULY, token));
    } catch (error) {
      reject(error);
    }
  });

export const sendEmail = ({ sendEmail }) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(sendEmail);
      const findEmail = await db.Accounts.findOne({
        where: { email: sendEmail },
      });
      if (!findEmail) return resolve(response("email not found", false));

      const setEmail = Math.random().toString(36).substring(2);
      const token_email = jwt.sign(
        {
          setEmail,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      await db.Accounts.update(
        { verificationToken: token_email },
        { where: { email: sendEmail } }
      );

      let username = findEmail.username;
      await sendMail(
        sendEmail,
        "Forgot Password",
        ` <div style="display: flex; justify-content: center; align-items: center">
        <div
          style="
            width: 400px;
            border: 1px solid gainsboro;
            border-radius: 5px;
            padding: 20px 10px;
          "
        >
          <h2 style="text-align: center; font-weight: bold">VIVU password reset</h2>
          <p style="text-align: start">
            Hi ${username}, it looks like you forgot your VIVU password.
          </p>
          <p style="text-align: start">
            Don't worry, click the button below to reset your password for your VIVU
            account
          </p>
          <div style="text-align: center">
            <a
            href="${process.env.CLIENT_URL}/forgot-password/${token_email}"
              target="_blank"
              style="
                background-color: green;
                border: none;
                border-radius: 5px;
                color: white;
                padding: 5px 10px;
                text-decoration: none;
              "
              >Reset password</a
            >
          </div>
        </div>
      </div>`
      );
      resolve(response("Request sent successfully", true));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const checkForgot = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkToken = await db.Accounts.findOne({
        where: { verificationToken: token },
      });

      if (!checkToken) return resolve(response("confirm failed", false));

      resolve(response("confirm success", checkToken.email));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const resetPass = ({ email, newPass }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newPassword = hashHandle(newPass);

      const data = await db.Accounts.update(
        { verificationToken: null, password: newPassword },
        {
          where: { email: email },
        }
      );
      if (data[0] > 0) {
        return resolve(
          response(
            "Reset password successfully, Please wait 3 seconds and the system will take you to the sign-in page.",
            true
          )
        );
      } else {
        return resolve(response("Reset password failed", false));
      }
    } catch (error) {
      reject(error);
    }
  });
