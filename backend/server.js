import express from 'express';
import cors from 'cors';
import { dbPromise, initDB } from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gym Tracker API is running and online' });
});

app.get('/api/workouts', async (req, res) => {
  try {
    const db = await dbPromise;
    const workouts = await db.all('SELECT * FROM workouts ORDER BY id DESC');
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/workouts', async (req, res) => {
  try {
    const { date, type, duration, weight, reps } = req.body;
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO workouts (date, type, duration, weight, reps) VALUES (?, ?, ?, ?, ?)',
      [date, type, duration, weight, reps]
    );
    const newWorkout = {
      id: result.lastID,
      date,
      type,
      duration,
      weight,
      reps
    };
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;
    await db.run('DELETE FROM workouts WHERE id = ?', [id]);
    res.json({ success: true, message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


