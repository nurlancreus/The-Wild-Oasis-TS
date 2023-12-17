import { z } from "zod";

export const signupFormSchema = z
  .object({
    fullName: z.string().min(1, "This field is required"),
    email: z
      .string()
      .email("Please, provide a valid email address")
      .min(1, "This field is required"),
    password: z
      .string()
      .min(1, "This field is required")
      .min(8, "Password needs a minimum of 8 characters"),
    passwordConfirm: z
      .string()
      .min(1, "This field is required")
      .min(8, "Password needs a minimum of 8 characters"),
  })
  .refine((data) => data.passwordConfirm === data.password, {
    message: "Passwords need to match",
    path: ["passwordConfirm"],
  });

export type TSignupFormSchema = z.infer<typeof signupFormSchema>;

export const updatePwFormSchema = z
  .object({
    password: z
      .string()
      .min(1, "This field is required")
      .min(8, "Password needs a minimum of 8 characters"),
    passwordConfirm: z
      .string()
      .min(1, "This field is required")
      .min(8, "Password needs a minimum of 8 characters"),
  })
  .refine((data) => data.passwordConfirm === data.password, {
    message: "Passwords need to match",
    path: ["passwordConfirm"],
  });

export type TUpdatePwFormSchema = z.infer<typeof updatePwFormSchema>;
