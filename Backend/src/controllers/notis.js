import * as services from "../services";

export const getNotis = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await services.getNotis(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
