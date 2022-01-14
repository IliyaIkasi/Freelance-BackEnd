import { IsEmail } from "class-validator";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    username: string;

    @IsEmail()
    @Column({
        unique: true
    })
    email: string;

    @Column({
        length: 10
    })
    password: string;
}