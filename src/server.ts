import 'module-alias/register';
import './config/dotenv';
import '@modules';
import express from 'express';
import path from 'path';
import router from './routers';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app
  .listen(port, () => {
    console.log(`Server listening on ➜ Local: http://localhost:${port}/`);
  })
  .on('error', (e) => console.error('httpServer: ', e));
