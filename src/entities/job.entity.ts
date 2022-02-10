import { Length } from "class-validator";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Recruiter } from "./recruiter.entity";
import { Seeker } from "./seeker.entity";

@Entity("jobs")
export class Job extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	job_title: string;

	@Column()
	contract_type: string;

	@Column()
	basic_salary: string;

	@Column()
	working_experience: string;

	@ManyToMany(() => Seeker, (seeker) => seeker.job)
	joinColumn: { name: "job_id" };
	seeker: Seeker[];

	@ManyToOne(() => Recruiter, (recruiter) => recruiter.job)
	recruiter_id: Recruiter;
}
