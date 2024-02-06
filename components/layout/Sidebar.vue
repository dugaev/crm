<script lang="ts" setup></script>

<template>
  <aside
    class="hidden md:block lg:block lg:px-8 lg:py-8 lg:bg-sidebar lg:h-full lg:w-full lg:relative"
  >
    <NuxtLink to="/" class="mb-20 block">
      <NuxtImg src="/logo.svg" alt="" width="120px" class="mx-auto" />
    </NuxtLink>

    <LayoutMenu />
  </aside>
</template>

<style scoped></style>
