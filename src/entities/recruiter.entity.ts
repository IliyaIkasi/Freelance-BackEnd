import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('recruiter')
export class Recruiter extends User{
    
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
}