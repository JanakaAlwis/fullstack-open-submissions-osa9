import { calculateBmi } from './bmiCalculator';

const [, , heightArg, weightArg] = process.argv;

if (!heightArg || !weightArg) {
  console.log('Usage: ts-node index.ts <height(cm)> <weight(kg)>');
  process.exit(1);
}

const height = Number(heightArg);
const weight = Number(weightArg);

if (isNaN(height) || isNaN(weight)) {
  console.log('Height and weight must be numbers!');
  process.exit(1);
}

console.log(calculateBmi(height, weight));
