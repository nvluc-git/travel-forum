<script setup>
import Divider from "primevue/divider";
</script>

<template>
  <div id="welcome-body ">
    <Divider />
    <section class="section-1 container">
      <div class="box-section1"></div>
    </section>
    <!-- 2 -->
  </div>
</template>

<style scoped>
.box-section1 {
  background-image: url(../../assets/imgs/welcome/bg-home.jpg);
  background-size: cover;
  background-position: center;
  padding-bottom: 37%;
  position: relative;
  border-radius: 5px;
}
.title-section {
  text-align: center;
  text-transform: uppercase;
}
.btn-sign {
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  color: white;
  text-decoration: none;
  transition: all 0.5s;
}
.btn-sign:hover {
  transform: scale(1.1);
}

.sign-in {
  background-color: #6499e9;
}
.sign-up {
  background-color: #fa709a;
}

.bg-intro {
  background-image: url(../../assets/imgs/welcome/intro1.avif);
  background-size: cover;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding-bottom: 30%;
}
.bg-intro2 {
  background-image: url(../../assets/imgs/welcome/intro2.avif);
  background-size: cover;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding-bottom: 30%;
}
</style>
