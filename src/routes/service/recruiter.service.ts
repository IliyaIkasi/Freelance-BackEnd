import { validate } from "class-validator";
import * as config from "config";
import { Request, Response } from "express";
import { Recruiter } from "../../entities/recruiter.entity";
import {
	Forbidden,
	Forbidden_Code,
	InternalServer,
	InternalServer_Code,
	NotFound,
	NotFound_Code,
	Ok,
	Ok_Code,
} from "../../status_code/status";
import { RecruiterRepository } from "../repository/recruiter.repository";

export class recruiterService {
	private readonly recruiterRepository = new RecruiterRepository();
	// constructor() {
	// 	this.recruiterRepository = this.recruiterRepository;
	// }

	public signUp = async (req: Request, res: Response) => {
		const recruiter: Recruiter = req["body"];
		const signUpRecruiter = await this.recruiterRepository.signUp(recruiter);
		try {
			return res
				.header(config.token_header, signUpRecruiter.token)
				.status(
					signUpRecruiter.success ? Ok_Code : signUpRecruiter.message_code
				)
				.json({
					message: signUpRecruiter.success
						? "Create " + Ok
						: signUpRecruiter.message,
					token: signUpRecruiter.token,
				});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public signIn = async (req: Request, res: Response) => {
		const recruiter: Recruiter = req["body"];
		try {
			const signInRecruiter = await this.recruiterRepository.signIn(recruiter);
			return res
				.header(config.token_header, signInRecruiter.token)
				.status(
					signInRecruiter.success ? Ok_Code : signInRecruiter.message_code
				)
				.json({
					message: signInRecruiter.success
						? "Signin " + Ok
						: signInRecruiter.message,
					token: signInRecruiter.token,
				});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public fetchAll = async (req: Request, res: Response) => {
		try {
			const allRecruiters = await this.recruiterRepository.fetchAll();
			return res.status(Ok_Code).json({
				message: Ok,
				allRecruiters,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public fetchOne = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const oneRecruiter = await this.recruiterRepository.fetchOne(id);
			if (oneRecruiter) {
				return res.status(Ok_Code).json({
					message: Ok,
					oneRecruiter,
				});
			}
			return res.status(NotFound_Code).json({
				message: NotFound,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public updateOne = async (req: Request, res: Response) => {
		const recruiter: Recruiter = req["body"];
		const { id } = req.params;
		try {
			const updateRecruiter = await this.recruiterRepository.updateOne(
				recruiter,
				id
			);
			if (updateRecruiter) {
				return res.status(Ok_Code).json({
					message: "Update " + Ok,
					updateRecruiter,
				});
			}
			return res.status(NotFound_Code).json({
				message: NotFound,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public deleteOne = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const deleteRecruiter = await this.recruiterRepository.deleteOne(id);
			if (deleteRecruiter.affected === 0) {
				return res.status(NotFound_Code).json({
					message: NotFound,
				});
			}
			return res.status(Ok_Code).json({
				message: "Delete" + Ok,
				deleteRecruiter,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};
}
