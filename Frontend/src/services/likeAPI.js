import { api } from "./baseAPI";

const nameModel = "/likes";

const likesAPI = {
  getLikes: async (id) => {
    return await api.get(`${nameModel}/${id}`);
  },
  onLike: async (id) => {
    return await api.post(`${nameModel}/${id}`);
  },
};

export default likesAPI;
