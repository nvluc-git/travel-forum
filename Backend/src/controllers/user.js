import * as services from "../services";
const cloudinary = require("cloudinary").v2;
import { mes, response } from "../config/common";
import { changePassword, updateAccount, sendMess } from "../helper/joi_schema";

export const getCurrentUser = async (req, res) => {
  try {
    const id = req.user.id;
    const respon = await services.getCurrentUser(id);
    return res.status(200).json(respon);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const getOneAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const respon = await services.getOneAccount(id);
    return res.status(200).json(respon);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const updateUser = async (req, res) => {
  try {
    const fileData = req.file;
    const id = req.user.id;
    const { error } = updateAccount.validate(req.body);
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response(error.details[0].message));
    }
    const data = await services.updateUser(id, req.body, fileData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const changePass = async (req, res) => {
  try {
    const id = req.user.id;
    const { error } = changePassword.validate(req.body);
    if (error) return res.json(response(error.details[0].message));
    const data = await services.changePass(id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const rpArticle = async (req, res) => {
  try {
    const userRp = req.user.id;
    const articleId = req.params.id;
    if (!userRp && !articleId) return res.status(401).json("not found data");
    const data = await services.rpArticle(userRp, articleId, req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const rp_user = async (req, res) => {
  try {
    const userSend = req.user.id;
    const rpUser = req.params.id;
    const fileData = req.file;
    console.log(userSend);
    console.log(rpUser);
    const { error } = sendMess.validate({
      ...req.body,
      image: fileData?.path,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response(error.details[0].message));
    }
    const data = await services.rp_user(userSend, rpUser, req.body, fileData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const userGetService = async (req, res) => {
  try {
    const respon = await services.userGetService();
    return res.status(200).json(respon);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
