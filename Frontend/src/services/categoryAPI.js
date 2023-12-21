import { api } from "./baseAPI";
const nameModel = "/categories";

const cateApi = {
  getCategories: async () => {
    return await api.get(`${nameModel}`);
  },
};

export default cateApi;
