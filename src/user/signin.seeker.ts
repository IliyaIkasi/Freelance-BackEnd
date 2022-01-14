import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class SignIn {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    experience: string;

    @IsNotEmpty()
    skills: string;

    @IsNotEmpty()
    qualification: string;
}