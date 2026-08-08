import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbPromise, initDB } from './db.js';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gym Tracker API is running and online' });
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const db = await dbPromise;
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ id: result.lastID, username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.run('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/workouts', async (req, res) => {
  try {
    const { userId } = req.query;
    const db = await dbPromise;
    const workouts = await db.all('SELECT * FROM workouts WHERE user_id = ? ORDER BY id DESC', [userId]);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/workouts', async (req, res) => {
  try {
    const { user_id, date, type, duration, weight, reps } = req.body;
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO workouts (user_id, date, type, duration, weight, reps) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, date, type, duration, weight, reps]
    );
    const newWorkout = {
      id: result.lastID,
      user_id,
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


