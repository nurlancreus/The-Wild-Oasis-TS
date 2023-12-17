import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin } from "@/services/apiCabins";
import type { TCabinsSchema } from "./cabinsSchema";

type TUpdateCabins = {
  newCabin: Omit<TCabinsSchema, "image"> & { image: string | File | undefined};
  id: number;
};

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabin, id }: TUpdateCabins) =>
      createUpdateCabin<TUpdateCabins["newCabin"]>(newCabin, id), // mutation fn should receive 1 element, therefore we use object with 2 props
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully updated.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating };
}
