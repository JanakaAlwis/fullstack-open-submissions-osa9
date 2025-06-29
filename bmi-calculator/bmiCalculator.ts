export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) throw new Error('Height and weight must be positive numbers');

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.log('Please provide height and weight as arguments');
  } else {
    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
      console.log('Provided values were not numbers');
    } else {
      try {
        const result = calculateBmi(height, weight);
        console.log(result);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  }
}
