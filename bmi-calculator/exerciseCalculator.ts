interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = "you need to push harder";

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent work, you met your goal!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments = (args: string[]): [number, number[]] => {
  if (args.length < 4) throw new Error("At least one target and one exercise value required");

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  if (isNaN(target) || dailyHours.some((h) => isNaN(h))) {
    throw new Error("All values must be numbers");
  }

  return [target, dailyHours];
};

// Run if executed directly
if (require.main === module) {
  try {
    const [target, dailyHours] = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }
}
