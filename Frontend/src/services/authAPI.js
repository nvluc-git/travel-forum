import { api } from "./baseAPI";

const nameModel = "/auth";

const authApi = {
  signUp: async ({ username, email, password }) => {
    return await api.post(nameModel + "/register", {
      username,
      email,
      password,
    });
  },
  verifyEmail: async (token) => {
    return await api.get(`${nameModel}/verify/${token}`);
  },
  signIn: async (values) => {
    return await api.post(nameModel + "/login", values);
  },
  sendEmail: async (values) => {
    return await api.post(nameModel + "/sendEmail", values);
  },
  checkForgot: async (token) => {
    return await api.get(`${nameModel}/checkForgot/${token}`);
  },
  resetPass: async ({ email, newPass }) => {
    return await api.put(`${nameModel}/resetPass`, { email, newPass });
  },
};

export default authApi;
