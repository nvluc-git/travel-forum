<script setup>
import { useRouter } from "vue-router";
import { accountsStore } from "@/stores/accounts.store";
const router = useRouter();
const useServices = accountsStore();
const runStore = async () => {
  await useServices.getSers();
};
runStore();

const goToMore = (value) => {
  router.push({ name: value });
};
</script>

<template>
  <div class="side-bar">
    <h4 class="title-side">Recommend some services</h4>
    <div>
      <div v-if="useServices.someServices <= 0">cc</div>
      <div v-else class="mt-3">
        <div
          v-for="(item, index) in useServices.someServices"
          :key="index"
          class="d-flex justify-content-start align-items-start gap-2 pb-2 mb-2"
          style="border-bottom: 1px solid gainsboro"
        >
          <img :src="item.image" class="img-art" />
          <a :href="item.linkTo" target="_blank" class="title-art my-hv">{{
            item.title
          }}</a>
        </div>
        <button
          class="btn btn-sm btn-outline-primary"
          @click="goToMore('services')"
        >
          See more
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-bar {
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.title-side {
  font-weight: bold;
  text-transform: capitalize;
}
.img-art {
  height: 50px;
  width: 50px;
  border-radius: 5px;
  object-fit: cover;
  border: 1px solid gainsboro;
}
.title-art {
  text-decoration: none;
  color: black;
}
.my-hv:hover {
  cursor: pointer;
  transition: all 0, 5s;
  color: #0766ad;
}
</style>
