<script setup>
import { accountsStore } from "@/stores/accounts.store";
import { NotiStore } from "@/stores/notis.store";

const useAcc = accountsStore();
const useNoti = NotiStore();

const runStore = async () => {
  await useAcc.getAccounts();
  await useNoti.onGetNoti(useAcc.currentUser.id);
};
runStore();
</script>

<template>
  <div class="header-admin">
    <div class="d-flex justify-content-end align-items-center gap-5 me-5">
      <div class="dropdown">
        <button
          class="btn btn-outline-primary"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="pi pi-bell" @click="runStore()"></i>
        </button>
        <div class="dropdown-menu p-1 box-notis">
          <h1>Notifications</h1>
          <div v-if="useNoti.notis <= 0">
            <div class="text-center mt-5 text-secondary">
              There is nothing here.
            </div>
          </div>
          <div class="notis" v-else>
            <div
              v-for="(item, index) in useNoti.notis"
              :key="index"
              class="notis-item"
            >
              <div class="content-noti" v-html="item.content"></div>
              <div class="date-noti">{{ item.createdAt }}</div>
            </div>
          </div>
        </div>
      </div>
      <img :src="useAcc.currentUser.avatar" class="img-header" />
    </div>
  </div>
</template>

<style scoped>
.header-admin {
  background-color: white;
  padding: 10px 0;
}
.img-header {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.box-notis {
  width: 350px;
  height: 400px;
  overflow: hidden;
}
.notis {
  width: 100%;
  height: 320px;
  overflow-y: scroll;
  padding: 0 5px;
}

.notis-item {
  width: 100%;
  line-height: 25px;
  text-align: start;
  padding: 10px 0;
  border-bottom: 1px solid gainsboro;
}
</style>
