import * as services from "../services";

export const actionLikes = async (req, res) => {
  try {
    const accountId = req.user.id;
    const articleId = req.params.articleId;
    const response = await services.actionLikes(accountId, articleId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
export const getLikes = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const response = await services.getLikes(articleId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
