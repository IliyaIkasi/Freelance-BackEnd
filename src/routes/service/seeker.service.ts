import { Request, Response } from "express";
import { Seeker } from "../../entities/seeker.entity";
import {
	Created,
	Exists,
	Bad_Request,
	InternalServer,
	InternalServer_Code,
	NotFound,
	NotFound_Code,
	Ok,
	Ok_Code,
} from "../../status_code/status";
import { SeekerRepository } from "../repository/seeker.repository";
import * as config from "config";

export class seekerService {
	private readonly seekerRepository = new SeekerRepository();
	constructor() {
		this.seekerRepository = this.seekerRepository;
	}

	public signUp = async (req: Request, res: Response) => {
		const seeker: Seeker = req["body"];
		const signUpSeeker = await this.seekerRepository.signUp(seeker);
		try {
			return res
				.header(config.token_header, signUpSeeker.token)
				.status(signUpSeeker.success ? Ok_Code : signUpSeeker.message_code)
				.json({
					message: signUpSeeker.success ? "Create" + Ok : signUpSeeker.message,
					token: signUpSeeker.token,
				});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				code: InternalServer_Code,
				message: InternalServer,
				error: error.message,
			});
		}
	};

	public signIn = async (req: Request, res: Response) => {
		const seeker: Seeker = req["body"];
		const signInSeeker = await this.seekerRepository.signIn(seeker);
		try {
			return res
				.header(config.token_header, signInSeeker.token)
				.status(signInSeeker.success ? Ok_Code : signInSeeker.message_code)
				.json({
					message: signInSeeker.success ? "SignIn" + Ok : signInSeeker.message,
					token: signInSeeker.token,
				});
		} catch (err) {
			console.log(err.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
				error: err.message,
			});
		}
	};

	public fetchAll = async (req: Request, res: Response) => {
		try {
			const allSeeker = await this.seekerRepository.fetchAll();
			return res.status(Ok_Code).json({
				message: Ok,
				allSeeker,
			});
		} catch (error) {
			console.log(InternalServer_Code);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public fetchOne = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const oneSeeker = await this.seekerRepository.fetchOne(id);
			if (!oneSeeker) return res.status(NotFound_Code).json({ NotFound });
			return res.status(Ok_Code).json({
				message: Ok,
				oneSeeker,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public updateOne = async (req: Request, res: Response) => {
		const seeker: Seeker = req["body"];
		const { id } = req.params;
		try {
			const updateSeeker = await this.seekerRepository.updateOne(seeker, id);
			return res.status(Ok_Code).json({
				message: "Update" + Ok,
				updateSeeker,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				messge: InternalServer,
			});
		}
	};

	public deleteOne = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const deleteSeeker = await this.seekerRepository.deleteOne(id);
			return res.status(Ok_Code).json({
				message: Ok,
				deleteSeeker,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};
}
