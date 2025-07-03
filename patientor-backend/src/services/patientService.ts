import patients from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const getPatients = () => patients;

const getPatientById = (id: string) => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: Patient) => {
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient
};