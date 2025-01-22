import { isValidPhoneNumber } from "libphonenumber-js"
import { z } from "zod"
import { Gender, MaritalStatus } from "~~/types/entity"

export const entitySchema = [
  z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.nativeEnum(Gender),
  }),
  z.object({
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine((value) => isValidPhoneNumber(value, { defaultCountry: "LB" }), {
        message: "Invalid phone number",
      }),
    dob: z.string().min(1, "Date of birth is required"),
  }),
  z.object({
    maritalStatus: z.nativeEnum(MaritalStatus),
    address: z.string().nullable(),
    profilePicture: z.string().nullable(),
  }),
]
