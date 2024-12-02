import './config/env';
import './modules';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Server app bot for Gemini is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
