import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login as loginApi } from "@/services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") || null;

  type TLogin = { email: string; password: string };

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: TLogin) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Invalidate query so redirect will also work after being logged out
      queryClient.setQueryData(["user"], user.user); // manually setting data into the cash
      console.log(redirectTo)
      redirectTo
        ? navigate(redirectTo, { replace: true })
        : navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
