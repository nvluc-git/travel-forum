import { api } from "./baseAPI";

const nameModel = "/types";

const typeAPI = {
  getTypes: async () => {
    return await api.get(`${nameModel}`);
  },
};

export default typeAPI;
