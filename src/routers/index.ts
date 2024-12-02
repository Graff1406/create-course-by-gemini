import express from 'express';
import path from 'path';

const router = express();

router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default router;
