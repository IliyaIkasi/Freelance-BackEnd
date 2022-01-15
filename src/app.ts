import * as express from 'express';
import { jobRoute } from './routes/controller/job.controller';
import { RecruiterRoute } from './routes/controller/recruiter.controller';
import { SeekerRoute } from './routes/controller/seeker.controller';
require ('./connection/connect_db.config');


const app = express();
app.use(express.json());
app.use(RecruiterRoute);
app.use(SeekerRoute);
app.use(jobRoute);

const port = 3000;
app.listen(port, ()=>{
    console.info(`Listening on post ${port}.`);
})