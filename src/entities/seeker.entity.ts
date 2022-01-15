import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, UpdateDateColumn } from "typeorm";
import { Job } from "./job.entity";
import { Recruiter } from "./recruiter.entity";
import { User } from "./user.entity";

@Entity('seeker')
export class Seeker extends User {

    @Column({
        length: 10
    })
    phone_number: string;

    @Column({
        length: 100
    })
    location: string;

    @Column({
        length: 100
    })
    experience: string;

    @Column({
        length: 100
    })
    skills: string

    @Column({
        length: 100
    })
    qualification: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Recruiter, recruiter => recruiter.seeker)
    @JoinColumn({ name: 'recruiter_id' })
    recruiter: Recruiter

    @ManyToMany(() => Job, job => job.seeker, {onDelete: 'SET NULL'})
    job: Job[]
}