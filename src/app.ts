import * as express from 'express';
import { RecruiterRoute } from './routes/recruiter.controller';
import { SeekerRoute } from './routes/seeker.controller';
require ('./connection/connect_db.config');


const app = express();
app.use(express.json());
app.use(RecruiterRoute);
app.use(SeekerRoute);


const port = 3000;
app.listen(port, ()=>{
    console.info(`Listening on post ${port}.`);
})