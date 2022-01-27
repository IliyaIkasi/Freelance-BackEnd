import { validate } from "class-validator";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Recruiter } from "../../entities/recruiter.entity";
import {
	Exists,
	Bad_Request,
	Validation,
	Validation_Code,
} from "../../status_code/status";
import jwt = require("jsonwebtoken");
import config = require("config");
import { Types } from "../../util/types.util";

@EntityRepository(Recruiter)
export class RecruiterRepository extends Repository<Recruiter> {
	/**
	 * Create Recruiter Account
	 */
	public signUp = async (recruiter: Recruiter): Promise<Types> => {
		const {
			first_name,
			last_name,
			username,
			email,
			password,
			company_name,
			contact_tel,
			contact_address,
		} = recruiter;

		const check = await Recruiter.findOne({ email });
		if (check)
			return {
				success: false,
				message: Exists,
				message_code: Bad_Request,
			};

		const newRecruiter = new Recruiter();
		newRecruiter.first_name = first_name;
		newRecruiter.last_name = last_name;
		newRecruiter.username = username;
		newRecruiter.email = email;
		newRecruiter.password = password;
		newRecruiter.company_name = company_name;
		newRecruiter.contact_tel = contact_tel;
		newRecruiter.contact_address = contact_address;

		newRecruiter.hashPassword(password);

		try {
			const errors = await validate(newRecruiter);
			if (errors.length > 0) throw new Error(Validation);
			await getManager().save(newRecruiter);

			// Generating Token
			const token = newRecruiter.generateAuthToken();
			return {
				success: true,
				token,
			};
		} catch (err) {
			return err.message;
		}
	};

	/**
	 * Signin to Recruiter Account
	 */
	public signIn = async (recruiter: Recruiter): Promise<Types> => {
		const { username, email, password } = recruiter;
		const signInRecruiterByUsername = await Recruiter.findOne({ username });
		const signInRecruiterByEmail = await Recruiter.findOne({ email });
		if (!signInRecruiterByUsername || !signInRecruiterByEmail) {
			return {
				success: false,
				message: "Invalid Username or Password",
				message_code: Validation_Code,
			};
		}
		const signInRecruiterPassword =
			await signInRecruiterByEmail.passwordValidity(password);
		if (!signInRecruiterPassword) {
			return {
				success: false,
				message: Validation,
				message_code: Validation_Code,
			};
		}
		const token = signInRecruiterByEmail.generateAuthToken();

		try {
			return {
				success: true,
				token,
			};
		} catch (error) {
			return error.message;
		}
	};

	/**
	 * Fetch All Recruiters
	 */
	public fetchAll = async () => {
		return await Recruiter.find();
	};

	/**
	 * Fetch One Recruiters
	 */
	public fetchOne = async (id: string) => {
		return await Recruiter.findOne(id);
	};

	/**
	 * Update One Recruiter
	 */
	public updateOne = async (recruiter: Recruiter, id: string) => {
		const {
			first_name,
			last_name,
			username,
			email,
			password,
			company_name,
			contact_tel,
			contact_address,
		} = recruiter;
		const updateRecruiter = await Recruiter.findOne(id);
		if (!updateRecruiter) {
			return;
		}
		first_name;
		last_name;
		username;
		password;
		email;
		company_name;
		contact_tel;
		contact_address;

		try {
			return await updateRecruiter.save();
		} catch (err) {
			return err;
		}
	};

	/**
	 * Delete One Recruiter
	 */
	public deleteOne = async (id: string) => {
		return await Recruiter.delete(id);
	};
}
