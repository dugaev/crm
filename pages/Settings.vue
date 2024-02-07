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
  <div class="text-center items-center">
    <button
      @click="logout"
      class="mt-36 mb-[20px] lg:block lg:mb-0 lg:absolute lg:right-10 transition-colors hover:text-[#8500f6] border py-3 px-6 rounded-lg"
    >
      <Icon name="line-md:log-out" size="26" class="mb-1" />
      Log Out
    </button>
  </div>
</template>
