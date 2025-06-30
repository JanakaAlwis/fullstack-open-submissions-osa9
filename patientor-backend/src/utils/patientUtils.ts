import { z } from 'zod';
import { Gender, Patient } from '../types';

// Your existing manual parsing functions

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth');
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// Zod schema with superRefine that calls your manual parsers and collects errors

const newPatientSchema = z.object({
  name: z.unknown(),
  dateOfBirth: z.unknown(),
  ssn: z.unknown(),
  gender: z.unknown(),
  occupation: z.unknown(),
}).superRefine((data, ctx) => {
  try {
    parseName(data.name);
  } catch (e) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: (e as Error).message, path: ['name'] });
  }
  try {
    parseDateOfBirth(data.dateOfBirth);
  } catch (e) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: (e as Error).message, path: ['dateOfBirth'] });
  }
  try {
    parseSsn(data.ssn);
  } catch (e) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: (e as Error).message, path: ['ssn'] });
  }
  try {
    parseGender(data.gender);
  } catch (e) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: (e as Error).message, path: ['gender'] });
  }
  try {
    parseOccupation(data.occupation);
  } catch (e) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: (e as Error).message, path: ['occupation'] });
  }
});

export type NewPatient = Omit<Patient, 'id'>;

export const toNewPatient = (object: unknown): NewPatient => {
  const result = newPatientSchema.safeParse(object);
  if (!result.success) {
    // Format error messages nicely
    const errors = result.error.errors
      .map(e => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    throw new Error(`Invalid patient data: ${errors}`);
  }
  // All validation passed, call manual parsers to get properly typed values
  return {
    name: parseName(object && (object as any).name),
    dateOfBirth: parseDateOfBirth(object && (object as any).dateOfBirth),
    ssn: parseSsn(object && (object as any).ssn),
    gender: parseGender(object && (object as any).gender),
    occupation: parseOccupation(object && (object as any).occupation),
  };
};
