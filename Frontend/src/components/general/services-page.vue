<script setup>
import headerPage from "../layout/header-page.vue";
import { accountsStore } from "@/stores/accounts.store";
const useService = accountsStore();
const runStore = async () => {
  await useService.getSers();
};
runStore();
</script>

<template>
  <div style="height: 100vh">
    <headerPage />
    <div class="container box-ser gap-5 mt-5">
      <div
        v-for="(item, index) in useService.services"
        :key="index"
        class="item-ser"
      >
        <a :href="item.linkTo" target="_blank" class="img-box"
          ><img :src="item.image" class="img-ser"
        /></a>
        <h4 class="text-center">{{ item.title }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-ser {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.item-ser {
  width: 250px;
  overflow: hidden;
}
.img-box {
  border-radius: 5px;
  overflow: hidden;
}
.img-ser {
  height: 150px;
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  border: 1px solid gainsboro;
}

.img-ser:hover {
  transition: all 0.5s;
  border-radius: 0;
}
</style>
