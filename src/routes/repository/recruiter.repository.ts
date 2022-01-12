import { EntityRepository, Repository } from "typeorm";
import { Recruiter } from "../../entities/recruiter.entity";
import { Signin } from "../../user/signin";

@EntityRepository(Recruiter)
export class RecruiterRepository extends Repository<Recruiter> {
    /**
     * Create Recruiter Account
     */
    public signIn = async (signin: Signin) => {
        const { id, username, password, email } = signin;

        try {
            const recruiter = new Recruiter();
            recruiter.id = id;
            recruiter.username = username;
            recruiter.email = email;
            recruiter.password = password;

            return await recruiter.save();
        } catch (err) {
            return err;
        }
    }

    /**
     * Fetch All Recruiters
     */
    public fetchAll = async () => {
        return await Recruiter.find();
    }

    /**
     * Fetch One Recruiters
     */
    public fetchOne = async (id:number) => {
        return await Recruiter.findOne(id);
    }

    /**
     * Update One Recruiter
     */
    public updateOne =async (signin:Signin, id:number) => {
        const { username, password, email } = signin;
        const recruiter = await Recruiter.findOne(id)
        if (!recruiter){
            return
        }
        try {
            recruiter.username = username;
            recruiter.password = password;
            recruiter.email = email;

            return await recruiter.save();
        } catch (err) {
            return err;
        }
    }

    /**
     * Delete One Recruiter
     */
    public deleteOne = async (id:number) => {
        return await Recruiter.delete(id);
    }
}