import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Seeker } from "../../entities/seeker.entity";
import {
	Exists,
	Bad_Request,
	Forbidden,
	Validation,
	Validation_Code,
} from "../../status_code/status";
import { Types } from "../../util/types.util";

@EntityRepository(Seeker)
export class SeekerRepository extends Repository<Seeker> {
	/**
	 * SignUp Job Seeker
	 */
	public signUp = async (seeker: Seeker): Promise<Types> => {
		const {
			first_name,
			last_name,
			username,
			email,
			password,
			phone_number,
			location,
			experience,
			skills,
			qualification,
		} = seeker;

		const check = await Seeker.findOne({ email });
		if (check)
			return {
				success: false,
				message: Exists,
				message_code: Bad_Request,
			};

		const newSeeker = new Seeker();
		newSeeker.first_name = first_name;
		newSeeker.last_name = last_name;
		newSeeker.username = username;
		newSeeker.email = email;
		newSeeker.password = password;
		newSeeker.phone_number = phone_number;
		newSeeker.location = location;
		newSeeker.experience = experience;
		newSeeker.skills = skills;
		newSeeker.qualification = qualification;

		newSeeker.hashPassword(password);

		try {
			const error = await validate(newSeeker);
			if (error.length > 0) throw new Error(Forbidden);
			await getManager().save(newSeeker);

			// Generating Token
			const token = newSeeker.generateAuthToken();
			return {
				success: true,
				token,
			};
		} catch (err) {
			return err.message;
		}
	};

	/**
	 * SignIn Job Seeker
	 */
	public signIn = async (seeker: Seeker): Promise<Types> => {
		const { username, email, password } = seeker;

		const signInSeekerByUsername = await Seeker.findOne({ username });
		const signInSeekerByEmail = await Seeker.findOne({ email });
		if (!signInSeekerByUsername || !signInSeekerByEmail) {
			return {
				success: false,
				message: Validation,
				message_code: Validation_Code,
			};
		}

		const signInSeekerPassword = await signInSeekerByEmail.passwordValidity(password);
		if (!signInSeekerPassword) {
			return {
				success: false,
				message: Validation,
				message_code: Validation_Code,
			};
		}
		const token = signInSeekerByEmail.generateAuthToken();
		try {
			return {
				success: true,
				token,
			};
		} catch (err) {
			return err.message;
		}
	};

	/**
	 * Fetch All Job Seeker
	 */
	public fetchAll = async () => {
		return await Seeker.find();
	};

	/**
	 * Fetch One Job Seeker
	 */
	public fetchOne = async (id: string) => {
		return await Seeker.findOne(id);
	};

	/**
	 * Update One Job Seeker
	 */
	public updateOne = async (seeker: Seeker, id: string) => {
		const {
			first_name,
			last_name,
			username,
			email,
			password,
			phone_number,
			location,
			experience,
			skills,
			qualification,
		} = seeker;
		const updateSeeker = await Seeker.findOne(id);
		if (!updateSeeker) {
			return;
		}
		try {
			updateSeeker.first_name = first_name;
			updateSeeker.last_name = last_name;
			updateSeeker.username = username;
			updateSeeker.email = email;
			updateSeeker.password = password;
			updateSeeker.phone_number = phone_number;
			updateSeeker.location = location;
			updateSeeker.experience = experience;
			updateSeeker.skills = skills;
			updateSeeker.qualification = qualification;

			return await updateSeeker.save();
		} catch (error) {
			return error.message;
		}
	};

	/**
	 * Delete One Job Seeker
	 */
	public deleteOne = async (id: string) => {
		return await Seeker.delete(id);
	};
}
