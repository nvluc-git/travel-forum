import { api } from "./baseAPI";

const nameModel = "/notis";

const notisAPI = {
  getNotis: async (id) => {
    return await api.get(`${nameModel}/${id}`);
  },
};

export default notisAPI;
