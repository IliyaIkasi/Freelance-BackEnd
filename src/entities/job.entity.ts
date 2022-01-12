import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum ContractType{
    SHORT_TERM = '3 Months',
    MEDIUM_TERM = '6 Months',
    LONG_TERM = '1 Year',
}

@Entity('job')
export class Job extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    job_title: string;

    @Column({
        type: 'enum',
        enum: ContractType
    })
    contract_type: string;

    @Column({
        length: 10
    })
    basic_salary: string;

    @Column({
        type: 'text'
    })
    working_experience: string
}