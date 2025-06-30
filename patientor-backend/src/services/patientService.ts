import patients from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// Add this function to add a new patient to the patients array
const addPatient = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  addPatient,
};
