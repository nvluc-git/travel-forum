<script setup>
import { useAuthenStore } from "@/stores/authen.store";
import { useRoute } from "vue-router";
const authStore = useAuthenStore();

const route = useRoute();

const onVerifyEmail = async (token) => {
  token = route.params.token;
  await authStore.onVerifyEmail(token);
};
onVerifyEmail();
</script>

<template>
  <div
    class="box-noti container-fluid d-flex justify-content-center align-items-center"
  >
    <div
      class="col-sm-7 col-md-6 col-lg-4 col-xl-4 col-xxl-3 rounded text-noti"
    >
      <i class="bi bi-check2-circle icon-done"></i>
      <p>Email verified successfully</p>
      <router-link
        :to="{ name: 'sign-in' }"
        class="btn btn-outline-primary w-100"
        >Sign In</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.box-noti {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  height: 100vh;
  overflow: hidden;
}
.text-noti {
  padding: 10px;
  text-align: center;
  line-height: 32px;
  font-size: 1.5em;
}
.icon-done {
  color: green;
  font-size: 8em;
}
</style>
