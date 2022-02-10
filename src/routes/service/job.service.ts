import { Request, Response } from "express";
import { Job } from "../../entities/job.entity";
import {
	InternalServer_Code,
	InternalServer,
	Ok_Code,
	Ok,
	NotFound_Code,
	NotFound,
} from "../../status_code/status";
import { JobRepository } from "../repository/job.repository";

export class jobService {
	private readonly jobRepository = new JobRepository();
	constructor() {
		this.jobRepository = this.jobRepository;
	}

	public createJob = async (req: Request, res: Response) => {
		const job: Job = req["body"];
		try {
			const jobOffer = await this.jobRepository.createJob(job);
			return res
				.status(jobOffer.success ? Ok_Code : jobOffer.message_code)
				.json({
					message: jobOffer.success ? "Create " + Ok : jobOffer.message,
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
			const allJobs = await this.jobRepository.fetchAll();
			return res.status(Ok_Code).json({
				message: Ok,
				allJobs,
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
			const oneJob = await this.jobRepository.fetchOne(id);
			if (oneJob) {
				return res.status(Ok_Code).json({
					message: Ok,
					oneJob,
				});
			}
			return res.status(NotFound_Code).json({ message: NotFound });
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};

	public updateOne = async (req: Request, res: Response) => {
		try {
			const job: Job = req["body"];
			const { id } = req.params;
			const updateJob = await this.jobRepository.updateOne(job, id);
			if (updateJob) {
				return res.status(Ok_Code).json({
					message: "Update " + Ok,
					updateJob,
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
			const deleteJob = await this.jobRepository.deleteOne(id);
			if (deleteJob.affected === 0) {
				return res.status(NotFound_Code).json({
					message: NotFound,
				});
			}
			return res.status(Ok_Code).json({
				message: "Delete" + Ok,
				deleteJob,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(InternalServer_Code).json({
				message: InternalServer,
			});
		}
	};
}
