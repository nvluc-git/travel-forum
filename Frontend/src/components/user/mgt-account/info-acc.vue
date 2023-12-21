<script setup>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { accountsStore } from "@/stores/accounts.store";
const useAcc = accountsStore();
const toast = useToast();
const runStore = async () => {
  await useAcc.getAccounts();
};
runStore();

const options = ref(["male", "female"]);
const phoneExp = /^(^\+251|^251|^0)?(9|7)\d{8}$/;

const showImg = (e) => {
  const file = e.target.files[0];
  useAcc.currentUser.avatar = URL.createObjectURL(file);
};

const updateInfo = yup.object().shape({
  username: yup.string().required().min(5).max(10),
  firstname: yup.string().required().min(5).max(10),
  lastname: yup.string().required().min(5).max(10),
  birthday: yup
    .date()
    .required()
    .test("birthday", "you must be 18 years old", function (birthdate) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 18);
      return birthdate <= cutoff;
    }),
  gender: yup.string().required(),
  phonenumber: yup
    .string()
    .required()
    .matches(phoneExp, "phonenumber must match the following: '0912345678'"),

  address: yup.string().required().min(5),
  avatar: yup.string(),
});
const update_Info = async (values) => {
  await useAcc.updateAccount(values);
  if (useAcc.checkData === true) {
    toast.add({
      severity: "success",
      detail: "Updated personal information successfully",
      life: 3000,
    });
  }
  await useAcc.getAccounts();
};
</script>

<template>
  <div>
    <Toast />
    <h1 class="text-primary">Personal Information</h1>
    <Form
      :validation-schema="updateInfo"
      @submit="update_Info"
      v-slot="{ isSubmitting }"
    >
      <div class="mb-5 text-center" style="overflow: hidden">
        <div class="text-center mt-2 mb-2">
          <img
            :src="useAcc.currentUser.avatar"
            style="height: 150px; width: 150px; border-radius: 50%"
          />
        </div>
        <Field type="file" name="avatar" id="myImg" @change="showImg" />

        <ErrorMessage class="err-mess mt-2" name="image" />
      </div>
      <div class="d-flex justify-content-around align-items-start">
        <!-- 1 -->
        <div
          class="d-flex flex-column justify-content-between align-items-start gap-4"
        >
          <div>
            <label for="username">User name</label>
            <Field
              type="text"
              id="username"
              name="username"
              class="form-control"
              :value="useAcc.currentUser.username"
            />
            <ErrorMessage name="username" class="err-mess" />
          </div>
          <div>
            <label for="firstname">First name</label>
            <Field
              type="text"
              id="firstname"
              name="firstname"
              class="form-control"
              :value="useAcc.currentUser.firstname"
            />
            <ErrorMessage name="firstname" class="err-mess" />
          </div>
          <div>
            <label for="lastname">Last name</label>
            <Field
              type="text"
              id="lastname"
              name="lastname"
              class="form-control"
              :value="useAcc.currentUser.lastname"
            />
            <ErrorMessage name="lastname" class="err-mess" />
          </div>
        </div>
        <!-- 2 -->
        <div
          class="d-flex flex-column justify-content-between align-items-start gap-4"
        >
          <div>
            <label for="birthday">Birthday</label>
            <Field
              type="date"
              id="birthday"
              name="birthday"
              class="form-control"
              :value="useAcc.currentUser.birthday"
            />

            <ErrorMessage name="birthday" class="err-mess" />
          </div>
          <div>
            <label for="gender">Gender</label>
            <Field
              name="gender"
              as="select"
              id="gender"
              class="form-select"
              :value="useAcc.currentUser.gender"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
              =
            </Field>
            <ErrorMessage name="gender" class="err-mess" />
          </div>

          <div>
            <label for="phonenumber">Phone number</label>
            <Field
              type="text"
              id="phonenumber"
              name="phonenumber"
              class="form-control"
              :value="useAcc.currentUser.phonenumber"
            />
            <ErrorMessage name="phonenumber" class="err-mess" />
          </div>
          <div>
            <label for="address">Address</label>
            <Field
              type="text"
              id="address"
              name="address"
              class="form-control"
              :value="useAcc.currentUser.address"
            />
            <ErrorMessage name="address" class="err-mess" />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-3 mt-5">
        <button
          type="submit"
          class="btn btn-sm btn-primary ps-5 pe-5"
          :disabled="isSubmitting"
        >
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Update
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.err-mess {
  font-size: 0.9em;
  color: red;
}
</style>
