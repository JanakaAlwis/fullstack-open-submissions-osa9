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

const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);
