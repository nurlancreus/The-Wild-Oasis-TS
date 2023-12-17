import { z } from "zod";

export const cabinsSchema = z
  .object({
    name: z.string().min(1, "This field is required"),
    maxCapacity: z
      .string()
      .min(1, "This field is required")
      .transform((data) => Number(data))
      .refine((n) => n >= 1, "capacity should be at least 1"),
    regularPrice: z
      .string()
      .min(1, "This field is required")
      .transform((data) => Number(data))
      .refine((n) => n >= 1, "capacity should be at least 1"),
    discount: z
      .string()
      .min(1, "This field is required")
      .transform((data) => Number(data)),
    description: z.string().min(1, "This field is required"),
    image: z
      .union([z.custom<FileList>(), z.string()])
      .optional()
      .refine((data) => typeof data === "string" || data?.length === 1, {
        message: "File is required",
      }),
  })
  .refine((data) => data.regularPrice > data.discount, {
    message: "Discount should be less than regular price.",
    path: ["discount"],
  });

export type TCabinsSchema = z.infer<typeof cabinsSchema>;

export interface ICabin {
  [index: string]: string | number;
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
