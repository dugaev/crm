<!-- 

    TODO: 
    [x] - add delete btn for customers
    [] - fix comments part
    [] - add delete btn for deals
    [] - add content for other pages
 -->

<script lang="ts" setup>
const store = useDealSlideStore();

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: (value) => {
    store.isOpen = value;
  },
});
</script>

<template>
  <div>
    <USlideover v-model="isLocalOpen">
      <UCard
        class="flex flex-col overflow-y-auto"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-border',
        }"
      >
        <template #header>
          <KanbanSlideoverTop />
        </template>
        <KanbanSlideoverComments />
      </UCard>
    </USlideover>
  </div>
</template>
