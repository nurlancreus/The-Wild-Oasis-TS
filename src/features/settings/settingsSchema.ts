import { z } from "zod";

export type TSettingsSchema = z.infer<typeof settingsSchema>;

export const settingsSchema = z
  .object({
    minBookingLength: z.coerce
      .number()
      .min(1, "This field is required, make changes")
      .gte(3, "Minimum nights should be at least 3"),
    maxBookingLength: z.coerce
      .number()
      .min(1, "This field is required, make changes")
      .lte(90, "Maximum nights should be at most 90"),
    maxGuestsPerBooking: z.coerce
      .number()
      .min(1, "This field is required, make changes")
      .lte(8, "Maximum guests should be at most 8"),
    breakfastPrice: z.coerce
      .number()
      .min(1, "This field is required, make changes")
      .gte(15, "Breakfast price should be at least 15"),
  })
  .refine((data) => data.minBookingLength < data.maxBookingLength, {
    message: "Minimum should be less than max",
    path: ["minBookingLength"],
  })
  .refine((data) => data.maxBookingLength > data.minBookingLength, {
    message: "Maximum should be more than min",
    path: ["maxBookingLength"],
  });
