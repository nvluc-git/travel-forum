<script setup>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useAuthenStore } from "@/stores/authen.store";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
const toast = useToast();
const router = useRouter();
const authStore = useAuthenStore();
const onGoTo = (page) => {
  router.push({ name: page });
};

const schema = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is required").min(6),
});
const send_email = yup.object().shape({
  sendEmail: yup.string().email("invalid email").required("email is required"),
});

const forgotPassLog = ref(false);

const isShowPass = ref(false);

const showPass = computed(() => {
  return {
    "bi bi-eye": isShowPass.value,
    "bi bi-eye-slash": !isShowPass.value,
  };
});
const onSignIn = async (values) => {
  await authStore.onSignIn(values);
};

const on_SendEmail = async (values) => {
  await authStore.onSendEmail(values);
  if (authStore.checkData === true) {
    toast.add({
      severity: "success",
      detail: authStore.mess,
      life: 3000,
    });
  }
  forgotPassLog.value = false;
};
</script>

<template>
  <div
    class="container-fluid d-flex justify-content-center align-items-center sign-in"
  >
    <Toast />

    <div class="col-sm-7 col-md-6 col-lg-4 col-xl-4 col-xxl-3 rounded box-sign">
      <div class="text-center mb-5">
        <h1 class="text-uppercase">Sign In</h1>
      </div>
      <Form
        :validation-schema="schema"
        @submit="onSignIn"
        v-slot="{ isSubmitting }"
      >
        <div class="form-group mb-2">
          <div class="input-group">
            <span class="input-group-text" id="email"
              ><i class="bi bi-envelope"></i
            ></span>
            <Field
              type="text"
              class="form-control"
              placeholder="email address"
              aria-describedby="email"
              name="email"
            />
          </div>
          <ErrorMessage class="err-mess" name="email" />
        </div>
        <!-- password -->
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-text" id="password"
              ><i class="bi bi-key"></i
            ></span>
            <Field
              class="form-control"
              placeholder="password"
              aria-describedby="password"
              :type="isShowPass ? 'text' : 'password'"
              name="password"
            />
            <span
              class="input-group-text"
              id="password"
              @click="isShowPass = !isShowPass"
              ><i :class="showPass"></i
            ></span>
          </div>

          <ErrorMessage class="err-mess" name="password" />
        </div>

        <span v-if="authStore.error === false" class="err-mess">{{
          authStore.dataRes.dataMess
        }}</span>

        <button
          type="submit"
          class="btn btn-primary w-100 mt-2"
          :disabled="isSubmitting"
        >
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Sign In
        </button>
      </Form>

      <div class="d-flex justify-content-around align-item-center mt-3">
        <button class="btn-forgot" @click="forgotPassLog = true">
          Forgot Password
        </button>
        <button class="btn-signUp" @click="onGoTo('sign-up')">
          Sign Up <i class="bi bi-person-fill-add"></i>
        </button>
      </div>
      <div class="btn-goBack" @click="onGoTo('welcome')">
        Back to welcome page
      </div>
    </div>
    <Dialog
      v-model:visible="forgotPassLog"
      modal
      header="Forgot Password"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <Form
          :validation-schema="send_email"
          @submit="on_SendEmail"
          v-slot="{ isSubmitting }"
        >
          <div>
            <label for="sendEmail">Email</label>
            <Field id="sendEmail" name="sendEmail" class="form-control" />
            <ErrorMessage name="sendEmail" class="err-mess" />
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
              Send Email
            </button>
          </div>
        </Form>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.sign-in {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  height: 100vh;
}
.box-sign {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  padding: 10px;
}

.btn-forgot {
  color: black;
  font-size: 0.8em;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  transition: all 0.5s;
  background-color: unset;
}
.btn-forgot:hover {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.btn-signUp {
  color: black;
  font-size: 0.8em;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  transition: all 0.5s;
  background-color: unset;
}
.btn-signUp:hover {
  background-color: #fd5d5d;
}
.btn-goBack {
  font-size: 0.7em;
  margin-top: 50px;
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
</style>
