import * as services from "../services";

export const getComments = async (req, res) => {
  try {
    const articleId = req.params.articleId;

    const response = await services.getComments(articleId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const newComment = async (req, res) => {
  try {
    const userId = req.user.id;

    const articleId = req.params.articleId;

    const response = await services.newComment(userId, articleId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const removeComment = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.removeComment(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
