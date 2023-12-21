<script setup>
import postMgt from "@/components/user/mgt-content/post-mgt";
import bookmarkMgt from "@/components/user/mgt-content/bookmark-mgt";
import questionMgt from "@/components/user/mgt-content/question-mgt";
import ScrollTop from "primevue/scrolltop";
import Sidebar from "primevue/sidebar";
import { ref } from "vue";

const mgt = ref("pMgt");
const showSideBar = ref(false);
document.title = "Content management";
</script>

<template>
  <div class="my-navbar bg-light">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="col-2">
        <router-link :to="{ name: 'home' }" style="text-decoration: none">
          <div class="d-flex justify-content-start align-items-center">
            <img
              src="../../assets/imgs/logo.png"
              style="width: 45px; height: 45px"
            />
            <div class="logo-text text-nowrap text-dark fw-bold ms-1">VIVU</div>
          </div></router-link
        >
      </div>
      <div
        class="d-flex justify-content-between align-items-center gap-3 item-nav"
      >
        <div class="text-nowrap mgt" @click="mgt = 'pMgt'">Post Management</div>
        <div class="text-nowrap mgt" @click="mgt = 'qMgt'">
          Question Management
        </div>
        <div class="text-nowrap mgt" @click="mgt = 'bMgt'">
          Bookmark Management
        </div>
      </div>
      <div class="my-sidebar">
        <button class="btn btn-light btn-sm" @click="showSideBar = true">
          <i class="pi pi-align-right"></i>
        </button>
      </div>
    </div>
  </div>
  <transition name="slide-fade">
    <section v-if="mgt === 'pMgt'">
      <postMgt />
    </section>
  </transition>

  <transition name="slide-fade">
    <section v-if="mgt === 'qMgt'">
      <questionMgt />
    </section>
  </transition>

  <transition name="slide-fade">
    <section v-if="mgt === 'bMgt'">
      <bookmarkMgt />
    </section>
  </transition>
  <Sidebar v-model:visible="showSideBar" header="Sidebar" position="right">
    <div>
      <div class="text-nowrap mgt" @click="mgt = 'pMgt'">Post Management</div>
      <div class="text-nowrap mgt" @click="mgt = 'qMgt'">
        Question Management
      </div>
      <div class="text-nowrap mgt" @click="mgt = 'bMgt'">
        Bookmark Management
      </div>
    </div>
  </Sidebar>
  <ScrollTop />
</template>

<style scoped>
.mgt {
  padding: 5px 10px;
  transition: all 0.5s;
  border-radius: 5px;
  cursor: pointer;
}
.mgt:hover {
  background-color: white;
}
.my-navbar {
  border-bottom: 2px solid gainsboro;
}
/* transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.my-sidebar {
  display: none;
}
@media only screen and (max-width: 1000px) {
  .item-nav {
    display: none !important;
  }
  .my-sidebar {
    display: block;
  }
}
@media only screen and (max-width: 992px) {
  .item-nav {
    display: none !important;
  }
  .my-sidebar {
    display: block;
  }
}
</style>
