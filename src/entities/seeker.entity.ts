import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	UpdateDateColumn,
} from "typeorm";
import { Job } from "./job.entity";
import { Recruiter } from "./recruiter.entity";
import { User } from "./user.entity";
import { Length } from "class-validator";

@Entity("seekers")
export class Seeker extends User {
	@Column()
	@Length(11)
	phone_number: string;

	@Column()
	location: string;

	@Column()
	experience: string;

	@Column()
	skills: string;

	@Column()
	qualification: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => Recruiter, (recruiter) => recruiter.seeker)
	@JoinColumn({ name: "recruiter_id" })
	recruiter: Recruiter;

	@ManyToMany(() => Job, (job) => job.seeker, { onDelete: "SET NULL" })
	job: Job[];
}
