<script setup>
import { MENU_DATA } from "./menu.data";
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div class="absolute top-[148px] left-2">
    <button @click="toggleMenu" class="block lg:hidden">
      <svg
        class="w-10 h-10 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>

    <transition name="slide-fade">
      <div v-show="isMenuOpen" class="lg:hidden">
        <nav class="bg-black z-40 shadow-lg rounded-lg">
          <div class="p-8">
            <NuxtLink
              class="flex items-center py-1 mr-4 px-2 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2.5"
              v-for="item in MENU_DATA"
              :key="item.name"
              :to="item.url"
              @click="closeMenu"
            >
              <Icon :name="item.icon" class="mr-3" />
              <span>{{ item.name }}</span>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
