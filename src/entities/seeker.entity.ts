import { Column, Entity } from "typeorm";
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
}