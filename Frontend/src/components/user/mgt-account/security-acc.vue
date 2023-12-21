<script setup>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { accountsStore } from "@/stores/accounts.store";

const useAcc = accountsStore();
const toast = useToast();
const isShowPass = ref(false);
const changePass = yup.object().shape({
  curPass: yup
    .string()
    .required("current password is required")
    .min(6, "current password must be at least 6 characters")
    .max(12, "current password must be at most 12 characters"),
  newPass: yup
    .string()
    .required("new password is required")
    .min(6, "new password must be at least 6 characters")
    .max(12, "new password must be at most 12 characters"),
  confirm: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("newPass")], "confirm password do not match new password"),
});

const change_pass = async (values, { resetForm }) => {
  const { curPass, newPass } = values;
  await useAcc.changePassword({ curPass, newPass });
  if (useAcc.checkData === true) {
    toast.add({
      severity: "success",
      detail: useAcc.mess,
      life: 3000,
    });
    resetForm();
  }
};
</script>

<template>
  <div>
    <Toast />
    <h1 class="text-primary">Password</h1>

    <div class="p-5">
      <Form
        :validation-schema="changePass"
        @submit="change_pass"
        v-slot="{ isSubmitting }"
      >
        <div class="mb-4">
          <label for="curPass">Current password</label>
          <Field
            id="curPass"
            class="form-control"
            :type="isShowPass ? 'text' : 'password'"
            name="curPass"
          />
          <ErrorMessage name="curPass" class="err-mess" />
          <span v-if="useAcc.checkData === false" class="err-mess">{{
            useAcc.mess
          }}</span>
        </div>

        <div class="mb-4">
          <label for="newPass">New password</label>
          <Field
            id="newPass"
            class="form-control"
            :type="isShowPass ? 'text' : 'password'"
            name="newPass"
          />
          <ErrorMessage name="newPass" class="err-mess" />
        </div>

        <div class="mb-2">
          <label for="confirm">Confirm password</label>
          <Field
            id="confirm"
            class="form-control"
            :type="isShowPass ? 'text' : 'password'"
            name="confirm"
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

        <div
          class="d-flex justify-content-center align-items-center gap-5 mt-5"
        >
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Change password
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.err-mess {
  font-size: 0.9em;
  color: red;
}
</style>
