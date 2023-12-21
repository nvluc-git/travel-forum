<script>
import { accountsStore } from "@/stores/accounts.store";

export default {
  beforeRouteEnter(to, from, next) {
    const useAcc = accountsStore();

    const runStore = async () => {
      await useAcc.getAccounts();
    };
    runStore();
    if (useAcc.currentUser.role === "Admin") {
      next();
    } else {
      next({ name: "home" });
    }
  },
};
</script>
<script setup>
import userMgt from "../../components/admin/user-mgt.vue";
import serviceMgt from "../../components/admin/service-mgt.vue";
import headerAdmin from "../../components/admin/header-admin.vue";
import { ref } from "vue";

const showPage = ref("userMgt");
document.title = "Admin";
</script>

<template>
  <div class="d-flex" style="height: 100vh">
    <div class="col-2 left-box">
      <div>
        <h1 class="text-primary text-center mb-5">Admin</h1>
      </div>
      <div @click="showPage = 'userMgt'" class="btn-changePage">
        <i class="bi bi-people"></i> <span>User Management</span>
      </div>
      <div @click="showPage = 'serviceMgt'" class="btn-changePage">
        <i class="bi bi-postcard"></i> <span>Service Management</span>
      </div>
      <div @click="$router.push({ name: 'home' })" class="btn-changePage">
        <i class="pi pi-arrow-left"></i> <span>VIVU Page</span>
      </div>
    </div>
    <div class="col-10 right-box bg-body-secondary d-flex flex-column p-0">
      <headerAdmin />

      <Transition>
        <div v-if="showPage === 'userMgt'" class="ps-2 pe-2">
          <userMgt />
        </div>
      </Transition>
      <Transition>
        <div v-if="showPage === 'serviceMgt'">
          <serviceMgt />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.left-box {
  height: 100vh;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-right: 1px solid gainsboro;
}
.right-box {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
.btn-changePage {
  margin-bottom: 10px;
  font-size: 1.1em;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-changePage:hover {
  transition: all 0.5s;
  background-color: #e4f1ff;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
