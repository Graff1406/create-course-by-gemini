import 'module-alias/register';
import './config/dotenv';
import '@modules';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Telegram bot with Gemini AI is already running!');
});

app.listen(port, () => {
  console.log(`Server listening on  ➜  Local: http://localhost:${port}/
    `);
});
