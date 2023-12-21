import * as services from "../services";

export const onBookmark = async (req, res) => {
  try {
    const accountId = req.user.id;
    const articleId = req.params.articleId;
    const response = await services.onBookmark(accountId, articleId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
export const getBookmark = async (req, res) => {
  try {
    const accountId = req.user.id;
    const response = await services.getBookmark(accountId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
