import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import routes from './routes';

const port = process.env.PORT || 5000;

connectDB();

const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());

app.use('/api', routes());

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

