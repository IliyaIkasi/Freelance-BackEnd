import { validate } from "class-validator";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Job } from "../../entities/job.entity";
import { Exists, Forbidden } from "../../status_code/status";

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
	/**
	 * Create Job
	 */
	public createJob = async (job: Job) => {
		const { id, job_title, contract_type, basic_salary, working_experience } =
			job;
		const check = await Job.findOne(id);
		if (check) return Exists;

		const newJob = new Job();
		(newJob.job_title = job_title),
			(newJob.contract_type = contract_type),
			(newJob.basic_salary = basic_salary),
			(newJob.working_experience = working_experience);

		const error = await validate(newJob);
		if (error.length > 0) throw new Error(Forbidden);
		try {
			return await getManager().save(newJob);
		} catch (err) {
			return err.message;
		}
	};

	/**
	 * Get All Jobs
	 */
	public fetchAll = async () => {
		return await Job.find();
	};

	/**
	 * Get One Job
	 */
	public fetchOne = async (id: string) => {
		return await Job.findOne(id);
	};

	/**
	 * Update Job
	 */
	public updateOne = async (job: Job, id: string) => {
		const { job_title, contract_type, basic_salary, working_experience } = job;
		const updateNewJob = await Job.findOne(id);
		if (!updateNewJob) return;
		const updateJob = new Job();
		updateJob.job_title = job_title;
		updateJob.contract_type = contract_type;
		updateJob.basic_salary = basic_salary;
		updateJob.working_experience = working_experience;

		try {
			return await updateJob.save();
		} catch (error) {
			error.message;
		}
	};

	/**
	 * Delete One Job
	 */
	public deleteOne = async (id: string) => {
		return await Job.delete(id);
	};
}
