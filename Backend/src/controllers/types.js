import * as services from "../services/types";

export const getAllType = async (req, res) => {
  try {
    const data = await services.getAllType();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
