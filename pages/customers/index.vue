<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { COLLECTION_CUSTOMERS, DB_ID } from "~/app.constants";
import type { ICustomer } from "~/types/deals.types";

useSeoMeta({
  title: "Customers | CRM System",
});

const queryClient = useQueryClient();

const deleteCustomer = async (customerId: string) => {
  await DB.deleteDocument(DB_ID, COLLECTION_CUSTOMERS, customerId);
  queryClient.invalidateQueries(["customers"]);
};

const { mutate: deleteCustomerMutation } = useMutation({
  mutationKey: ["deleteCustomer"],
  mutationFn: (customerId: string) => deleteCustomer(customerId),
  onSuccess: () => {
    queryClient.invalidateQueries(["customers"]);
  },
});
const { data: customers, isLoading } = useQuery({
  queryKey: ["customers"],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Customers</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[200px]">Image</UiTableHead>
          <UiTableHead class="w-[300px]">Name</UiTableHead>
          <UiTableHead class="w-[200px]">E-Mail</UiTableHead>
          <UiTableHead>From</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="customer in (customers?.documents as unknown as ICustomer[])"
          :key="customer.$id"
        >
          <UiTableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <NuxtImg
                :src="customer.avatar_url"
                alt="customer.name"
                width="50"
                height="50"
                class="rounded-full"
              />
            </NuxtLink>
          </UiTableCell>
          <UiTableCell class="font-medium">
            {{ customer.name }}
          </UiTableCell>
          <UiTableCell>
            {{ customer.email }}
          </UiTableCell>
          <UiTableCell>
            {{ customer.from_source }}
          </UiTableCell>
          <UiTableCell>
            <UiButton @click="() => deleteCustomerMutation(customer.$id)">
              Delete
            </UiButton>
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
