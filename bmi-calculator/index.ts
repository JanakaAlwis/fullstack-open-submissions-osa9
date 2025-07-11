import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const bmi = calculateBmi(height, weight);

    return res.json({
      weight,
      height,
      bmi,
    });
  } catch (error) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(body.daily_exercises) ||
    typeof body.target !== 'number' ||
    body.daily_exercises.some((h: any) => typeof h !== 'number')
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(body.daily_exercises, body.target);
    return res.json(result);
  } catch {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
