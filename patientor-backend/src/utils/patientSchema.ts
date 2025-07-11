import { z } from "zod";
import { Gender } from "../types";

export const newPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, "Occupation is required"),
});

export type NewPatient = z.infer<typeof newPatientSchema>;
