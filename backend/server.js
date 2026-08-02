import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gym Tracker API is running and online' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
