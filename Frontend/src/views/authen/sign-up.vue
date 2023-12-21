<script setup>
import { useRouter } from "vue-router";
import { useAuthenStore } from "@/stores/authen.store";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref, computed } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const authStore = useAuthenStore();
const isShowPass = ref(false);
const isAgree = ref(false);

const onGoTo = (page) => {
  router.push({ name: page });
};

const signUp = yup.object().shape({
  username: yup.string().required("user name is required").min(5).max(15),
  email: yup.string().required("email is required").email("invalid email"),
  password: yup.string().required("password is required").min(6).max(12),
  confirm: yup
    .string()
    .required("password is required")
    .oneOf([yup.ref("password")], "password do not match"),
});

const showPass = computed(() => {
  return {
    "bi bi-eye": isShowPass.value,
    "bi bi-eye-slash": !isShowPass.value,
  };
});

const onSignUp = async (values, { resetForm }) => {
  const { username, email, password } = values;
  await authStore.onSignUp({ username, email, password });
  isAgree.value = false;
  resetForm();
  authStore.error;
  if (authStore.error === false) {
    return toast.add({
      severity: "error",
      summary: "Notification",
      detail: authStore.dataRes.dataMess,
      life: 5000,
    });
  }
};
</script>

<template>
  <div v-if="authStore.error === true">
    <div
      class="sign-in container-fluid d-flex justify-content-center align-items-center"
    >
      <div
        class="col-sm-7 col-md-6 col-lg-4 col-xl-4 col-xxl-4 rounded text-noti"
      >
        Welcome
        <span class="username-info">{{
          authStore.dataRes.dataUser.username
        }}</span
        >, your account has been successfully registered. We have sent you an
        activation notification at email address
        <span class="email-info">{{ authStore.dataRes.dataUser.email }}</span
        >. Please check your inbox to complete.
      </div>
    </div>
  </div>
  <div v-else>
    <div
      class="container-fluid d-flex justify-content-center align-items-center sign-in"
    >
      <div
        class="col-sm-7 col-md-6 col-lg-4 col-xl-4 col-xxl-3 rounded box-sign"
      >
        <div class="text-center mb-3">
          <h1 class="text-uppercase">Sign Up</h1>
          <p style="font-size: 0.8em; color: #61677a">
            Please enter your real email address to receive notifications.
          </p>
        </div>
        <Form
          :validation-schema="signUp"
          @submit="onSignUp"
          v-slot="{ isSubmitting }"
        >
          <!-- username -->
          <div class="form-group mb-2">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-person"></i
              ></span>
              <Field
                type="text"
                name="username"
                class="form-control"
                placeholder="user name"
              />
            </div>
            <ErrorMessage name="username" class="err-mess" />
          </div>
          <!-- email -->
          <div class="form-group mb-2">
            <div class="input-group">
              <span class="input-group-text"
                ><i class="bi bi-envelope"></i
              ></span>
              <Field
                type="text"
                name="email"
                class="form-control"
                placeholder="email address"
              />
            </div>

            <ErrorMessage name="email" class="err-mess" />
          </div>
          <!-- password -->
          <div class="form-group mb-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-key"></i></span>
              <Field
                class="form-control"
                placeholder="password"
                :type="isShowPass ? 'text' : 'password'"
                name="password"
              />
              <span class="input-group-text" @click="isShowPass = !isShowPass"
                ><i :class="showPass"></i
              ></span>
            </div>

            <ErrorMessage name="password" class="err-mess" />
          </div>

          <!-- confirm password -->
          <div class="form-group mb-3">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-key"></i></span>
              <Field
                class="form-control"
                placeholder="confirm password"
                :type="isShowPass ? 'text' : 'password'"
                name="confirm"
              />
            </div>

            <ErrorMessage name="confirm" class="err-mess" />
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="agreeTerms"
              v-model="isAgree"
            />
            <label
              class="form-check-label"
              for="agreeTerms"
              style="font-size: 0.8em; cursor: pointer"
              >Agree to terms and conditions</label
            >
          </div>

          <div v-if="!isAgree">
            <button
              type="submit"
              class="btn btn-outline-primary w-100"
              :disabled="!isAgree"
            >
              Sign up
            </button>
          </div>

          <div v-else>
            <button class="btn btn-primary w-100" :disabled="isSubmitting">
              <span
                v-show="isSubmitting"
                class="spinner-border spinner-border-sm mr-1"
              ></span>
              Sign up
            </button>
          </div>
        </Form>
        <div class="d-flex justify-content-around align-items-center">
          <div class="btn-goBack" @click="onGoTo('welcome')">
            Back to welcome page
          </div>
          <div class="btn-goBack" @click="onGoTo('sign-in')">
            Back to sign in page
          </div>
        </div>
      </div>
    </div>
    <div class="card flex justify-content-center">
      <Toast />
    </div>
  </div>
</template>

<style scoped>
.sign-in {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  height: 100vh;
  overflow: hidden;
}
.box-sign {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  padding: 10px;
}

.btn-goBack {
  font-size: 0.7em;
  margin-top: 30px;
  text-transform: lowercase;
  opacity: 0.5;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  color: #7d7c7c;
}
.btn-goBack:hover {
  opacity: 1;
  text-decoration: underline;
  color: black;
}
.err-mess {
  color: #d71313;
  font-size: 0.8em;
}
.text-noti {
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  padding: 10px;
  text-align: start;
  line-height: 32px;
  font-size: 1.1em;
}
.username-info {
  font-weight: bold;
  color: #0a6ebd;
}
.email-info {
  font-weight: bold;
  color: #ff78c4;
}
</style>
