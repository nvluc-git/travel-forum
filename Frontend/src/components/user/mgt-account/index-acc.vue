<script setup>
import { accountsStore } from "@/stores/accounts.store";
const useAcc = accountsStore();
const runStore = async () => {
  await useAcc.getAccounts();
};
runStore();
</script>

<template>
  <div class="">
    <div class="mt-5 text-center">
      <img :src="useAcc.currentUser.avatar" class="img-user" />
      <h1 class="text-primary mt-2">
        Welcome {{ useAcc.currentUser.username }}
      </h1>
      <h4 class="fw-bold text-secondary">
        Manage your profile information and security
      </h4>
    </div>

    <div
      class="d-flex justify-content-around align-items-start box-data"
      style="margin-top: 30px"
    >
      <div
        class="d-flex flex-column justify-content-start align-items-start gap-2"
      >
        <div class="text-item">
          <span class="fw-bold">Email:</span> {{ useAcc.currentUser.email }}
        </div>
        <div class="text-item">
          <span class="fw-bold">Username:</span>
          {{ useAcc.currentUser.username }}
        </div>
        <div class="text-item">
          <span class="fw-bold">First name:</span>
          {{ useAcc.currentUser.firstname }}
        </div>
        <div class="text-item">
          <span class="fw-bold">Last name:</span>
          {{ useAcc.currentUser.lastname }}
        </div>
      </div>
      <div
        class="d-flex flex-column justify-content-start align-items-start gap-2"
      >
        <div class="text-item">
          <span class="fw-bold">Birthday:</span>
          {{ useAcc.currentUser.birthday }}
        </div>
        <div class="text-item">
          <span class="fw-bold">Gender:</span> {{ useAcc.currentUser.gender }}
        </div>
        <div class="text-item">
          <span class="fw-bold">Phone number:</span>
          {{ useAcc.currentUser.phonenumber }}
        </div>
        <div class="text-item">
          <span class="fw-bold">Address:</span> {{ useAcc.currentUser.address }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-user {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 1px solid gainsboro;
}
.text-item {
  font-size: 1.2em;
}

@media only screen and (max-width: 768px) {
  .box-data {
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: center !important;
    gap: 10px;
    padding-left: 30px;
  }
}
@media only screen and (max-width: 576px) {
  .text-item {
    font-size: 0.9em;
  }
}
</style>
