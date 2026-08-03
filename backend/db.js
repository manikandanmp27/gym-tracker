import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

const initDB = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      type TEXT,
      duration TEXT,
      weight INTEGER,
      reps INTEGER
    )
  `);
};

export { dbPromise, initDB };
