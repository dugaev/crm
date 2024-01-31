import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const store = useDealSlideStore();
  const commentRef = ref<string>();

  const { mutate } = useMutation({
    mutationKey: ["Add comments"],
    mutationFn: () =>
      DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), {
        text: commentRef.value,
        deal: store.card?.id,
      }),
    onSuccess: () => {
      refetch();
      commentRef.value = "";
    },
  });

  const writeComment = () => {
    if (!commentRef.value) return;
    mutate();
  };

  return { commentRef, writeComment };
}
