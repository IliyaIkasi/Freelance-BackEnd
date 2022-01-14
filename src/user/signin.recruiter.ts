import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class Signin {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    contact_tel: string;

    @IsNotEmpty()
    contact_address: string;
}