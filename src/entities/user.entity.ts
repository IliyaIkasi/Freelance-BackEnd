import { IsEmail, Length } from "class-validator";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as config from "config";

export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	username: string;

	@IsEmail()
	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	hashPassword = (password: string) => {
		const salt = bcrypt.genSaltSync(10);
		return (this.password = bcrypt.hashSync(password, salt));
	};

	passwordValidity(password: string) {
		return bcrypt.compareSync(password, this.password);
	}

	generateAuthToken = () => {
		return jwt.sign({ id: this.id }, config.jwtPrivateKey);
	}
}
