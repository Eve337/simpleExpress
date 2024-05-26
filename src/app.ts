import express from 'express';
import cors, { CorsOptions } from "cors";
import { Endpoints } from './constants/routes';
import { videosRouter } from './routes/videos/videos.routes';
import { testingRouter } from './routes/testing/testing.routes';

export const app = express()

// const corsOptions: CorsOptions = {
//   origin: "http://localhost:3000"
// };
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
  console.log(Endpoints.VIDEOS, Endpoints.TESTING)
  res.status(200).json({version: '1.0'})
})

app.use(Endpoints.VIDEOS, videosRouter);
app.use(Endpoints.TESTING, testingRouter);