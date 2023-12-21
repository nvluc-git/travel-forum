<script setup>
import { articlesStore } from "@/stores/articles.store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

import { ref } from "vue";

const useStore = articlesStore();
useStore.onGetAll();

const myModules = [Autoplay, Pagination, Grid];
const services = ref([
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
  { title: "asdsadas", image: "https://picsum.photos/200" },
]);
</script>

<template>
  <div class="questions-bar p-2 rounded mb-5">
    <h3 class="fw-bold pb-1" style="border-bottom: 1px solid gainsboro">
      Services
    </h3>

    <Swiper
      :modules="myModules"
      :pagination="{ clickable: true, dynamicBullets: true }"
      :slidesPerView="1"
      :grid="{
        rows: 5,
      }"
      class="pb-2"
    >
      <SwiperSlide
        v-for="(item, index) in services"
        :key="index"
        class="mt-2 mb-2"
      >
        <div class="d-flex jutstify-content-start align-items-center">
          <div
            :style="{ backgroundImage: 'url(' + item.image + ')' }"
            class="img-avatar col-4"
          ></div>
          <div
            class="col-9 d-flex flex-column jutstify-content-center align-items-start"
          >
            <div class="author">{{ item.account }}</div>
            <div class="my-title" :title="item.title">{{ item.title }}</div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.a {
  border: 1px solid red;
  /* height: 100px; */
}
.questions-bar {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.img-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
}
.author {
  color: grey;
  font-size: 0.9em;
  transition: all 0.5s;
}
.author:hover {
  color: aqua;
  cursor: pointer;
}
.my-title {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: start;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.5s;
  color: black;
  text-decoration: none;
}
</style>
