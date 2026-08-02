import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let workouts = [
  { id: 1, date: "Oct 12", type: "Push (Chest/Shoulders)", duration: "45 mins", weight: 135, reps: 10 },
  { id: 2, date: "Oct 10", type: "Pull (Back/Biceps)", duration: "50 mins", weight: 95, reps: 12 },
  { id: 3, date: "Oct 09", type: "Leg Day", duration: "60 mins", weight: 185, reps: 8 }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gym Tracker API is running and online' });
});

app.get('/api/workouts', (req, res) => {
  res.json(workouts);
});

app.post('/api/workouts', (req, res) => {
  const newWorkout = req.body;
  workouts = [newWorkout, ...workouts];
  res.status(201).json(newWorkout);
});

app.delete('/api/workouts/:id', (req, res) => {
  const { id } = req.params;
  workouts = workouts.filter(workout => workout.id !== Number(id));
  res.json({ success: true, message: 'Workout deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

