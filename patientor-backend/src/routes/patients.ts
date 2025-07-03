import express from 'express';
import patientService from '../services/patientService';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils/patientUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

// New route to get one patient by id including entries
router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patientWithId = { ...newPatient, id: uuid(), entries: [] }; // add empty entries on create
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
