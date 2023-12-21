import * as services from "../services";
const cloudinary = require("cloudinary").v2;
import { newService, checkUpdateService, sendMess } from "../helper/joi_schema";
import { response } from "../config/common";

export const getAllUser = async (req, res) => {
  try {
    const respon = await services.getAllUser();
    return res.status(200).json(respon);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
export const bannedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.bannedUser(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
export const changeRole = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.changeRole(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.deleteUser(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const sendMessToUser = async (req, res) => {
  try {
    const adminId = req.user.id;
    const userId = req.params.id;
    const fileData = req.file;
    console.log(fileData);
    console.log("id", userId);
    console.log("admin", adminId);

    const { error } = sendMess.validate({
      ...req.body,
      image: fileData?.path,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response(error.details[0].message));
    }
    const data = await services.sendMessToUser(
      adminId,
      userId,
      req.body,
      fileData
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const getAllService = async (req, res) => {
  try {
    const respon = await services.getAllService();
    return res.status(200).json(respon);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const getOneService = async (req, res) => {
  try {
    const respon = await services.getOneService(req.params.id);
    return res.status(200).json(respon);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

//create
export const createService = async (req, res) => {
  try {
    const accountId = req.user.id;
    const fileData = req.file;

    const { error } = newService.validate({
      ...req.body,
      image: fileData?.path,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response(error.details[0].message));
    }
    const data = await services.createService(accountId, req.body, fileData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
// update
export const updateService = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = checkUpdateService.validate({
      ...req.body,
      image: fileData?.path,
    });

    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response(error.details[0].message));
    }

    const data = await services.updateService(req.body, fileData);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

// delete
export const removeService = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.deleteService(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
export const removeArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.removeArticle(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
