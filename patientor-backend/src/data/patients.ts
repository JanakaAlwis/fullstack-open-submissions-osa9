import { Gender, Patient, Entry, HealthCheckRating } from '../types';

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "New york city cop",
    entries: [
      {
        id: "1",
        date: "2020-01-01",
        type: "Hospital",
        specialist: "Dr House",
        diagnosisCodes: ["S62.5"],
        description: "Broken finger.",
        discharge: {
          date: "2020-01-05",
          criteria: "Healing well"
        }
      }
    ]
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: Gender.Male,
    occupation: "Cop",
    entries: [
      {
        id: "2",
        date: "2021-03-15",
        type: "OccupationalHealthcare",
        specialist: "Dr Smith",
        employerName: "Cop Dept",
        description: "Back pain at work.",
        sickLeave: {
          startDate: "2021-03-16",
          endDate: "2021-03-30"
        }
      }
    ]
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: Gender.Other,
    occupation: "Technician",
    entries: [
      {
        id: "3",
        date: "2022-07-20",
        type: "HealthCheck",
        specialist: "Dr Adams",
        description: "Yearly health check.",
        healthCheckRating: HealthCheckRating.LowRisk
      }
    ]
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: Gender.Female,
    occupation: "Forensic Pathologist",
    entries: []
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: Gender.Male,
    occupation: "Digital evangelist",
    entries: []
  }
];

export default patients;
