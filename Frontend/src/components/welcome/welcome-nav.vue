<script setup></script>

<template>
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
</template>

<style scoped>
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
</style>
