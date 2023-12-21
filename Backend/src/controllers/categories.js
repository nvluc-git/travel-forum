import * as services from "../services/categories";

export const getAllCategory = async (req, res) => {
  try {
    const data = await services.getAllCategory();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
};
