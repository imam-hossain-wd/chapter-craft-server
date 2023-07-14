import cookieParser from 'cookie-parser';
import { Application } from 'express';
import express from 'express'
import cors from 'cors'

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

export default app;