<script lang="ts" setup></script>

<template>
  <aside
    class="md:block lg:block lg:px-8 lg:py-8 lg:bg-sidebar lg:h-full lg:w-full lg:relative"
  >
    <NuxtLink to="/" class="mb-20 md:block lg:block">
      <NuxtImg src="/logo.svg" alt="" width="120px" class="mx-auto mt-8" />
    </NuxtLink>
    <LayoutBurgerMenu />
    <LayoutMenu class="hidden md:block lg:block" />
  </aside>
</template>

<style scoped></style>
