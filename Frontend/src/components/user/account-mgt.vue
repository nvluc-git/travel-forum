<script setup>
import indexAcc from "./mgt-account/index-acc";
import infoAcc from "./mgt-account/info-acc";
import securityAcc from "./mgt-account/security-acc";
import { ref } from "vue";

const showPage = ref("indexPage");
document.title = "Account management";
</script>

<template>
  <div
    class="d-flex justify-content-between align-items-start"
    style="height: 100vh"
  >
    <div class="col-2 left-box">
      <div @click="showPage = 'indexPage'" class="btn-changePage">
        <i class="pi pi-home icon-bar"></i> <span class="text-bar">Home</span>
      </div>

      <div @click="showPage = 'inforPage'" class="btn-changePage">
        <i class="bi bi-person-vcard icon-bar"></i>
        <span class="text-bar">Information</span>
      </div>

      <div @click="showPage = 'securityPage'" class="btn-changePage">
        <i class="bi bi-shield-shaded icon-bar"></i>
        <span class="text-bar">Password</span>
      </div>

      <div
        class="btn-changePage back-vivu"
        @click="$router.push({ name: 'home' })"
      >
        <i class="pi pi-arrow-left"></i>
        <span class="text-bar">Back</span>
      </div>
    </div>
    <div class="col-10 right-box">
      <div v-if="showPage === 'indexPage'">
        <indexAcc />
      </div>

      <div v-if="showPage === 'inforPage'">
        <infoAcc />
      </div>

      <div v-if="showPage === 'securityPage'">
        <securityAcc />
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-box {
  height: 100vh;
  border-right: 2px solid gainsboro;
  background-color: whitesmoke;
}
.right-box {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
.btn-changePage {
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.btn-changePage:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}
@media only screen and (max-width: 768px) {
  .back-vivu {
    font-size: 0.8em;
  }

  .btn-changePage {
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@media only screen and (max-width: 576px) {
  .text-bar {
    display: none;
  }

  .btn-changePage {
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
