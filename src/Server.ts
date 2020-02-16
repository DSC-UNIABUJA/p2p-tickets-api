import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import {logger} from '@shared';
import BaseRouter from './routes';

// Init express
const app = express();

// Connect to database
(async () => {
  try {
    const options: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    };
    await mongoose.connect(process.env.DB_URL as string, options);
  } catch (error) {
    logger.error(error);
    throw error;
  }
})();

// Add middleware/settings/routes to express.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Default response
app.use('/', (_, res) => res.send({status: true, body: 'Server works'}));

app.use('/', BaseRouter);

// Export express instance
export default app;
