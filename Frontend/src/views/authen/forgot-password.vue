<template>
  <div
    class="container-fluid d-flex justify-content-center align-items-center sign-in"
  >
    <div class="col-sm-7 col-md-6 col-lg-4 col-xl-4 col-xxl-3 rounded box-sign">
      <h1 class="text-primary">Reset Password</h1>
      <Form
        :validation-schema="forgotPass"
        @submit="resetPass"
        v-slot="{ isSubmitting }"
      >
        <div>
          <label for="newPass">New password</label>
          <Field
            id="newPass"
            name="newPass"
            class="form-control"
            :type="isShowPass ? 'text' : 'password'"
          />
          <ErrorMessage name="newPass" class="err-mess" />
        </div>
        <div class="mt-2 mb-2">
          <label for="confirm">Confirm password</label>
          <Field
            id="confirm"
            name="confirm"
            class="form-control"
            :type="isShowPass ? 'text' : 'password'"
          />
          <ErrorMessage name="confirm" class="err-mess" />
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <div
            class="form-check"
            @click="isShowPass = !isShowPass"
            style="font-size: 0.9em"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :value="isShowPass"
              id="flexCheckChecked"
            />
            <label
              class="form-check-label"
              for="flexCheckChecked"
              @click="isShowPass = !isShowPass"
            >
              Show password
            </label>
          </div>
        </div>
        <div class="text-center mt-3">
          <button
            type="submit"
            class="btn btn-sm btn-primary ps-5 pe-5"
            :disabled="isSubmitting"
          >
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Confirm
          </button>
        </div>
      </Form>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { ref } from "vue";
document.title = "Forgot password";
import { useRoute } from "vue-router";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useAuthenStore } from "@/stores/authen.store";
import router from "@/routers";
const useAuthen = useAuthenStore();
const route = useRoute();

const runStore = async () => {
  const token = route.params.token;
  await useAuthen.onConfirmForgot(token);
};
runStore();

const isShowPass = ref(false);
const forgotPass = Yup.object().shape({
  newPass: Yup.string().required("password is required").min(6).max(12),
  confirm: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("newPass")], "password do not match"),
});
const resetPass = async (values) => {
  const { newPass } = values;
  await useAuthen.onResetPass({ newPass });
  if (useAuthen.checkData === true) {
    toast.add({
      severity: "success",
      detail: useAuthen.mess,
      life: 3000,
    });
  } else {
    toast.add({
      severity: "danger",
      detail: useAuthen.mess,
      life: 3000,
    });
  }
  setTimeout(() => {
    router.push({ name: "sign-in" });
  }, 3000);
};
</script>

<style scoped>
.box-sign {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  padding: 10px;
}
.sign-in {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  height: 100vh;
}
.err-mess {
  font-size: 0.9em;
  color: red;
}
</style>
