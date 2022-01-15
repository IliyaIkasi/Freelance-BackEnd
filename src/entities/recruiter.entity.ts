import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, UpdateDateColumn } from "typeorm"
import { Job } from "./job.entity";
import { Seeker } from "./seeker.entity";
import { User } from "./user.entity";

@Entity('recruiter')
export class Recruiter extends User {

    @Column()
    company_name: string;

    @Column({
        length: 10
    })
    contact_tel: string;

    @Column({
        type: 'text'
    })
    contact_address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Seeker, seeker => seeker.recruiter, {onDelete: 'SET NULL'})
    seeker: Seeker;

    @OneToOne(() => Job, job => job.recruiter, {onDelete: 'CASCADE'})
    job: Job
}