<script setup>
import { ref } from "vue";
const count = ref(100);
const increment = () => {
  count.value++;
};
const decrement = () => {
  count.value--;
};
</script>

<template>
  <div class="App">
    <h2>{{ count }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<style scoped></style>
