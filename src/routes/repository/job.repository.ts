import { EntityRepository, Repository } from "typeorm";
import { Job } from "../../entities/job.entity";
import { Seeker } from "../../entities/seeker.entity";
import { Exists } from "../../status_code/status";

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
    /**
     * Create Job 
     */
    public createJob = async (job: Job) => {
        const { id, job_title, contract_type, basic_salary, working_experience } = job;
        const checkExist = await Job.findOne(id);
        if (checkExist) return Exists
        try {
            const job = new Job();
            job.job_title = job_title,
            job.contract_type = contract_type,
            job.basic_salary = basic_salary,
            job.working_experience = working_experience

             return await job.save();
        } catch (error) {
            return error.message;
        }
    }

    /**
     * Get All Jobs
     */
    public fetchAll = async () => {
        return await Job.find();
    }

    /**
     * Get One Job
     */
    public fetchOne = async (id: number) => {
        return await Job.findOne(id);
    }

    /**
     * Update Job
     */
    public updateOne = async (job: Job, id:number) => {
        const { job_title, contract_type, basic_salary, working_experience } = job;
        const updateJob = await Job.findOne(id);
        if(!updateJob) return;
        try {
            const updateJob = new Job();
            updateJob.job_title = job_title;
            updateJob.contract_type = contract_type;
            updateJob.basic_salary = basic_salary;
            updateJob.working_experience = working_experience;

            return await updateJob.save();
        } catch (error) {
            error.message;
        }
    }

    /**
     * Delete One Job
     */
    public deleteOne = async (id: number) => {
        return await Job.delete(id)
    }
}