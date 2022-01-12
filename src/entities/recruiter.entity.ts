import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('recruiter')
export class Recruiter extends User{
    
    @Column()
    company_name: string;

    @Column()
    contact_name: string;

    @Column({
        length: 10
    })
    contact_tel: string;
    
    @Column({
        type: 'text'
    })
    contact_address: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}