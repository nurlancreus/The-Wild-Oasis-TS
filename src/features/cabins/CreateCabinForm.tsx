import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { FormRow, Input, Textarea, FileInput, Button, Form } from "@/ui";

import { type ICabin, type TCabinsSchema, cabinsSchema } from "./cabinsSchema";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

type CabinFormProps = {
  cabinToUpdate?: ICabin;
  onCloseModal?: () => void;
};

function CreateCabinForm({
  cabinToUpdate = {} as ICabin,
  onCloseModal,
}: CabinFormProps) {
  const queryClient = useQueryClient();
  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { register, handleSubmit, reset, formState } = useForm<TCabinsSchema>({
    resolver: zodResolver(cabinsSchema),
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  const onSubmit = (data: TCabinsSchema) => {
    const img = typeof data.image === "string" ? data.image : data.image?.[0]; // we check if imageUrl is string or fileList
    if (isUpdateSession) {
      updateCabin(
        { newCabin: { ...data, image: img }, id: updateId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] }), // we revalidate because want to update form inputs not reset
              onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: img },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
      console.log(data);
    }
  };

  // button text
  let buttonText;

  if (isUpdateSession) {
    buttonText = isUpdating ? "Updating..." : "Update cabin";
  } else {
    buttonText = isCreating ? "Creating..." : "Create new cabin";
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name")}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity")}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice")}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount")}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>{buttonText}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
