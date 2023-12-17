import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "./useSignup.js";
import { Form, Button, FormRow, Input } from "@/ui";
import { signupFormSchema, type TSignupFormSchema } from "./authSchema.js";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignupFormSchema>({resolver: zodResolver(signupFormSchema)});

  const { signup, isPending } = useSignup();

  const onSubmit = ({ fullName, email, password }: TSignupFormSchema) => {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName")}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email")}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="on"
          disabled={isPending}
          {...register("password")}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="on"
          disabled={isPending}
          {...register("passwordConfirm")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          type="reset"
          onClick={() => reset()}
          $variation="secondary"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
