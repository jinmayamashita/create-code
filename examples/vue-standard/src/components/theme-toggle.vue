<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from "vue";

const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

defineProps<{ message: string }>();

const isDarkMode = ref(matchMedia.matches);

function handleChange(event: MediaQueryListEvent) {
  isDarkMode.value = event.matches;
}

onMounted(() => matchMedia.addEventListener("change", handleChange));
onUnmounted(() => matchMedia.removeEventListener("change", handleChange));

watchEffect(() => {
  isDarkMode.value
    ? document.body.classList.add("dark-scheme")
    : document.body.classList.remove("dark-scheme");
});
</script>

<template>
  <div class="centered">
    <div>
      <img
        class="logo"
        src="logo.svg"
        role="button"
        alt=""
        @click="isDarkMode = !isDarkMode"
      />
    </div>
    <h1>Vue</h1>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
img {
  transition: all 0.4s ease;
}
.logo {
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(-1.5px 0 0.4em #42b883aa);
}
</style>
