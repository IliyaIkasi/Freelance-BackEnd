import { IConfig } from "config";
import * as express from "express";
import { jobRoute } from "./routes/controller/job.controller";
import { RecruiterRoute } from "./routes/controller/recruiter.controller";
import { SeekerRoute } from "./routes/controller/seeker.controller";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
require("./connection/connect_db.config");

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(RecruiterRoute);
app.use(SeekerRoute);
app.use(jobRoute);
app.use(cookieParser());

const port = 4000;
app.listen(port, () => {
	console.info(`Listening on port ${port}.`);
});
