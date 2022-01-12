import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class Signin {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    username: string;

    // @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}