<script lang="ts" setup>
import dayjs from "dayjs";
import { useDealSlideStore } from "~/store/deal-slide.store";
import { ArrowLeftIcon } from "@radix-icons/vue";
const store = useDealSlideStore();

const closeSlideOver = () => {
  store.isOpen = false;
};
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="flex gap-6">
      <button @click="closeSlideOver">
        <ArrowLeftIcon class="outline-none w-8 h-10 mb-4" />
      </button>
      <div class="uppercase bold text-xl mb-4">About deal:</div>
    </div>
    <KanbanSlideoverLabel label-text="Task Name">
      <h2>{{ store.card?.name }}</h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Sum">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Client">
      {{ store.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Created">
      {{ dayjs(store.card?.$createdAt).format("DD MMMM YYYY") }}
    </KanbanSlideoverLabel>
    <!-- <UiButton class="mt-8"> Delete </UiButton> -->
  </div>
</template>
