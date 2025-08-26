<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app" style="display:flex; justify-content:center; align-items:center; height:100vh;">
    <FlipCard />
  </div>
</template>

<script>
import FlipCard from "./components/FlipCard.vue"

export default {
  components: { FlipCard }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
