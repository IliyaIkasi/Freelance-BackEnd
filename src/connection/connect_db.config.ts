import { Connection, createConnection } from "typeorm";
import { Job } from "../entities/job.entity";
import { Recruiter } from "../entities/recruiter.entity";
import { Seeker } from "../entities/seeker.entity";

require("dotenv").config();

const connection = async () => <Connection>await createConnection({
		type: "postgres",
		host: "localhost",
		port: 5000,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env["DATABASE"],
		synchronize: true,
		logging: false,
		entities: [Recruiter, Seeker, Job],
	});

connection()
	.then(() => console.log("Connected on Postgres Database Successfully"))
	.catch((err) =>
		console.log(`Unable to Connect with postgres Database ${err}`)
	);
