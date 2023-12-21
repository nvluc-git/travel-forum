<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goTo = (value) => {
  router.push({ name: `${value}` });
};
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="">
      <i class="bi bi-emoji-frown" style="font-size: 10em"></i>
      <h1 class="text-uppercase">Page Not Found</h1>
      <p class="fs-5">
        We can't seem to find the page you're looking for. Please check the URL
        for any typos.
      </p>
      <ul class="menu">
        <li>
          <div class="btn-nav" @click="goTo('home')">Go to home page</div>
        </li>
        <li>
          <div class="btn-nav" @click="goTo('about')">Contact support</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.btn-nav {
  margin-bottom: 10px;
  cursor: pointer;
}
.btn-nav:hover {
  text-decoration: underline;
  color: blue;
}
</style>
