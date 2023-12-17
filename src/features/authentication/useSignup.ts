import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "@/services/apiAuth";
import type { TSignupFormSchema } from "./authSchema";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }: Omit<TSignupFormSchema, "passwordConfirm">) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please, verify the new account from the user's email address."
      );
    },
  });
  return { signup, isPending };
}
