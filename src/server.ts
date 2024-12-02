import express from 'express';
import router from './routers';
import path from 'path';

import 'module-alias/register';
import './config/dotenv';
import '@modules';

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'public')));

// Register the router
server.use('/', router);

server
  .listen(port, () => {
    console.log(`Server listening on  ➜  Local: http://localhost:${port}/
    `);
  })
  .on('error', (e) => console.error(e));
