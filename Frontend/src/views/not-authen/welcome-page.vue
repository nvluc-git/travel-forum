<script setup></script>

<template>
  <div class="welcome-page">
    <div id="nav">
      <div class="container text-end pt-1 pb-1">
        <router-link :to="{ name: 'sign-in' }" class="sign-btn me-4"
          >Sign in</router-link
        >
        <router-link :to="{ name: 'sign-up' }" class="sign-btn"
          >Sign Up</router-link
        >
      </div>
    </div>

    <div id="welcome-header">
      <section class="text-center container pt-5">
        <h1 class="title-header">VIVU</h1>
        <p class="text-uppercase">
          A place to share and find information about travel
        </p>
      </section>
    </div>
    <section class="section-1 container">
      <div class="box-section1"></div>
    </section>
  </div>
</template>

<style scoped>
.welcome-page {
  position: relative;
  overflow: hidden;
}
.title-header {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 4em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #16a085;
}
#nav {
  background-color: #272829;
}
.sign-btn {
  color: white;
  text-decoration: none;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.5s;
}
.sign-btn:hover {
  opacity: 0.5;
}
.box-section1 {
  background-image: url(../../assets/imgs/welcome/bg-home.jpg);
  background-size: cover;
  background-position: center;
  padding-bottom: 37%;
  position: relative;
  border-radius: 5px;
}
</style>
