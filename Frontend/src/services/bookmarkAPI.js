import { api } from "./baseAPI";
const nameModel = "/bookmark";

const bookmarkApi = {
  getBookmark: async () => {
    return await api.get(`${nameModel}`);
  },
  onBookmark: async (articleId) => {
    return await api.post(`${nameModel}/${articleId}`);
  },
};

export default bookmarkApi;
