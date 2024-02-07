<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();

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
  <div class="text-center items-center">
    <button
      @click="logout"
      class="mt-36 mb-[20px] transition-colors hover:text-[#FFA500] border py-3 px-6 rounded-lg"
    >
      <Icon name="line-md:log-out" size="26" class="mb-1" />
      Log Out
    </button>
  </div>
</template>
