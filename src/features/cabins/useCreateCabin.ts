import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin } from "@/services/apiCabins";
import { TCabinsSchema } from "./cabinsSchema";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin: Omit<TCabinsSchema, "image"> & { image: string | File | undefined}) => createUpdateCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin successfully created.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
