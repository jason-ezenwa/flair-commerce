import express, { json} from 'express';
const app = express();
import path from 'path';
// ...

// Construct the absolute path to the static directory
const staticDirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from the specified directory
app.use('/public/flair-commerce-uploads', express.static(path.join(staticDirname, 'public', 'flair-commerce-uploads'))); // path serving static files

import morgan from 'morgan';
import { connect } from 'mongoose';
import cors from 'cors';
import allRoutes from './routes/index.js';
import authJwt from './utils/jwt.js';
import errorHandler from './utils/error_handler.js';

// get env variables from .env file
import 'dotenv/config';
// middleware
app.use(cors());
app.options('*', cors());
app.use(json());
app.use(morgan('tiny')); // logger
app.use(authJwt()); // secures server based on jwt.
app.use(errorHandler);

const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

app.use(`${api}`, allRoutes);

connect(
  process.env.CONNECTION_STRING,
  {
    useUnifiedTopology: true,
  },
).then(
  () => {
    console.log('Connected to db');
  },
).catch((error) => {
  console.log({ error });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('App is listening...');
  console.log(api);
});

export default app;
