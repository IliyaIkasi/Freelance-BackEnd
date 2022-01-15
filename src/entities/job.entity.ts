import { BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recruiter } from "./recruiter.entity";
import { Seeker } from "./seeker.entity";

@Entity('job')
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    job_title: string;

    @Column()
    contract_type: string;

    @Column({
        length: 10
    })
    basic_salary: string;

    @Column({
        type: 'text'
    })
    working_experience: string

    @ManyToMany(() => Seeker, seeker => seeker.job)
    joinColumn: { name: 'job_id' }
    seeker: Seeker[];

    @OneToOne(() => Recruiter, recruiter => recruiter.job)
    recruiter: Recruiter
}