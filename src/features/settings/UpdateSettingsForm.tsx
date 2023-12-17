import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, Spinner, FormRow, Input, Button } from "@/ui";

import { settingsSchema, type TSettingsSchema } from "./settingsSchema";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings, isPending } = useSettings();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSettingsSchema>({
    resolver: zodResolver(settingsSchema),
    values: {
      minBookingLength: settings?.minBookingLength ?? 0,
      maxBookingLength: settings?.maxBookingLength ?? 0,
      maxGuestsPerBooking: settings?.maxGuestsPerBooking ?? 0,
      breakfastPrice: settings?.breakfastPrice ?? 0,
    },
  });

  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isPending) return <Spinner />;

  const onSubmit = (data: TSettingsSchema) => {
    console.log(data);
    updateSetting(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        error={errors?.minBookingLength?.message}
        label="Minimum nights/booking"
      >
        <Input
          type="number"
          disabled={isUpdating}
          {...register("minBookingLength")}
        />
      </FormRow>
      <FormRow
        error={errors?.maxBookingLength?.message}
        label="Maximum nights/booking"
      >
        <Input
          type="number"
          disabled={isUpdating}
          {...register("maxBookingLength")}
        />
      </FormRow>
      <FormRow
        error={errors?.maxGuestsPerBooking?.message}
        label="Maximum guests/booking"
      >
        <Input
          type="number"
          disabled={isUpdating}
          {...register("maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow error={errors?.breakfastPrice?.message} label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          {...register("breakfastPrice")}
        />
      </FormRow>
      <div className="settings-form-bottom">
        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            type="reset"
            onClick={() => reset()}
            $variation="secondary"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Save Changes</Button>
        </FormRow>
      </div>
    </Form>
  );
}

export default UpdateSettingsForm;
