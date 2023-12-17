import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "@/services/apiAuth";

export type TUpdateUser = {
  password?: string;
  fullName?: string;
  avatar?: File | null;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ password, fullName, avatar }: TUpdateUser) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: () => {
      // queryClient.setQueryData(["user"], user); // manually setting cash
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User account successfully updated.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
