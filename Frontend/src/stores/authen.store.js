import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import authApi from "@/services/authAPI";

export const useAuthenStore = defineStore("authen", () => {
  const router = useRouter();

  const dataRes = reactive({
    dataMess: null,
    dataUser: null,
  });
  const error = ref(null);
  const userToken = ref(localStorage.getItem("user"));

  const onSignUp = async ({ username, email, password }) => {
    try {
      const response = await authApi.signUp({ username, email, password });
      const { message, data } = response.data;
      dataRes.dataMess = message;
      error.value = false;
      if (data !== false)
        return (dataRes.dataUser = data), (error.value = true);
    } catch (error) {
      error;
    }
  };

  const onVerifyEmail = async (token) => {
    try {
      const response = await authApi.verifyEmail(token);
      const { data } = response.data;
      if (data === false) return router.push({ name: "error" });
    } catch (error) {
      error;
    }
  };

  const onSignIn = async (values) => {
    try {
      const response = await authApi.signIn(values);
      const { message, data } = response.data;
      dataRes.dataMess = message;
      error.value = false;
      if (data !== false) {
        error.value = true;
        userToken.value = data;
        localStorage.setItem("user", userToken.value);
        router.push({ name: "home" });
        return;
      }
    } catch (error) {
      error;
    }
  };
  const onSignOut = () => {
    userToken.value = null;
    localStorage.removeItem("user");
    router.push({ name: "welcome" });
  };

  const mess = ref("");
  const checkData = ref(null);
  const emailData = ref("");
  const onSendEmail = async (values) => {
    try {
      const res = await authApi.sendEmail(values);
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };
  const onConfirmForgot = async (token) => {
    try {
      const res = await authApi.checkForgot(token);
      const { message, data } = res.data;
      if (data === false) router.push({ name: "error" });
      mess.value = message;
      emailData.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const onResetPass = async ({ newPass }) => {
    try {
      const email = emailData.value;
      const res = await authApi.resetPass({ email, newPass });
      const { message, data } = res.data;
      checkData.value = data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dataRes,
    onResetPass,
    mess,
    checkData,
    onSendEmail,
    onSignIn,
    onSignOut,
    onSignUp,
    onVerifyEmail,
    userToken,
    error,
    onConfirmForgot,
    emailData,
  };
});

//json.parse() - convert json to object / json.stringify() - convert object to json

//
// try {
// userSignIn.dataMess = message;
// if (data) {
//   userSignIn.dataUser = data;
//   localStorage.setItem("user", JSON.stringify(userSignIn.dataUser));
//   router.push(returnUrl.value || { name: "home" });
//   return;
// }
// } catch (error) {
//   (error);
// }
