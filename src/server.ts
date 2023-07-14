import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Request, Response } from 'express';

async function run() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(` Database is connected successfully`);
    
    app.get('/', (req:Request, res:Response)=>{
      res.send('hello world')
    })
     app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }
}

run().catch(error => console.log(error))