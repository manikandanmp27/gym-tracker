import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

const initDB = async () => {
  const db = await dbPromise;
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT,
      type TEXT,
      duration TEXT,
      weight INTEGER,
      reps INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  try {
    await db.exec('ALTER TABLE workouts ADD COLUMN user_id INTEGER');
  } catch (err) {
  }
};



export { dbPromise, initDB };
