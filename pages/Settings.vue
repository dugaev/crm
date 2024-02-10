<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();

useSeoMeta({
  title: "Settings | CRM System",
});
const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  authStore.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};
</script>

<template>
  <h1 class="p-10 font-bold text-2xl mb-10 text-center">Settings</h1>
  <div class="">
    <button
      @click="logout"
      class="mt-36 mb-[20px] transition-colors hover:text-[#8500f6] border py-3 px-6 rounded-lg lg:mt-7 mx-10"
    >
      <Icon name="line-md:log-out" size="26" class="mb-1" />
      Log Out
    </button>
  </div>
</template>
