import * as express from 'express';
import { RecruiterRoute } from './routes/recruiter.controller';
require ('./connection/connect_db.config');


const app = express();
app.use(express.json());
app.use(RecruiterRoute);


const port = 3000;
app.listen(port, ()=>{
    console.info(`Listening on post ${port}.`);
})