import * as services from "../services";
import { response } from "../config/common";
import { newArticle } from "../helper/joi_schema";
const cloudinary = require("cloudinary").v2;

//get all
export const getAllArticle = async (req, res) => {
  try {
    const data = await services.getAllArticle();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
// get one
export const getOneArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.getOneArticle(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
// get by user
export const getArticleByUser = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await services.getArticleByUser(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
// get by post
export const getArticleByPost = async (req, res) => {
  try {
    const data = await services.getArticleByPost();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
// get by question
export const getArticleByQuestion = async (req, res) => {
  try {
    const data = await services.getArticleByQuestion();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

// get post user
export const getPostUser = async (req, res) => {
  try {
    const accountId = req.user.id;
    const data = await services.getPostUser(accountId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
// get question user
export const getQuestionUser = async (req, res) => {
  try {
    const accountId = req.user.id;
    const data = await services.getQuestionUser(accountId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

//create
export const createArticle = async (req, res) => {
  try {
    const accountId = req.user.id;
    const fileData = req.file;

    const { error } = newArticle.validate({
      ...req.body,
      image: fileData?.path,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response(error.details[0].message));
    }
    const data = await services.createArticle(accountId, req.body, fileData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

// update
export const updateArticle = async (req, res) => {
  try {
    const fileData = req.file;
    const articleId = req.body.articleId;
    if (!articleId) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return res.json(response("articleId is require"));
    }
    const data = await services.updateArticle(req.body, fileData);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

// delete
export const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.deleteArticle(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
