import express from 'express';
import patientService from '../services/patientService';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils/patientUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patientWithId = { ...newPatient, id: uuid() };
    const addedPatient = patientService.addPatient(patientWithId);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
