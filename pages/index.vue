<script setup lang="ts">
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import { convertCurrency } from "@/utils/convertCurrency";
import { useMutation } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { generateColumnStyle } from "~/components/kanban/generateGradient";
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useDealSlideStore } from "~/store/deal-slide.store";
import type { EnumStatus } from "~/types/deals.types";
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
useSeoMeta({
  title: "Home | CRM System",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
    }),
  onSuccess: () => {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between">
      <h1 class="font-bold text-2xl mb-10">Dashboard</h1>
      <button
        @click="logout"
        class="absolute right-10 transition-colors hover:text-[#8500f6] border py-3 px-6 rounded-lg"
      >
        <Icon name="line-md:log-out" size="26" class="mb-1" />
        Log Out
      </button>
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-screen"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-5"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <UiCardHeader role="button" @click="store.set(card)">
                <UiCardTitle>{{ card.name }}</UiCardTitle>

                <UiCardDescription class="mt-2 block">{{
                  convertCurrency(card.price)
                }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs">
                <div>Company</div>
                {{ card.companyName }}</UiCardContent
              >
              <UiCardFooter>
                {{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}
              </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>
