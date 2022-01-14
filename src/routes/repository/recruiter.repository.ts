import { EntityRepository, Repository } from "typeorm";
import { Recruiter } from "../../entities/recruiter.entity";

@EntityRepository(Recruiter)
export class RecruiterRepository extends Repository<Recruiter> {
    /**
     * Create Recruiter Account
     */
    public signUp = async (recruiter: Recruiter) => {
        const { first_name, last_name, username, email, password, company_name, contact_tel, contact_address } = recruiter;

        try {
            let recruiter = new Recruiter();
            recruiter.first_name = first_name;
            recruiter.last_name = last_name;
            recruiter.username = username;
            recruiter.email = email;
            recruiter.password = password;
            recruiter.company_name   = company_name;
            recruiter.contact_tel = contact_tel;
            recruiter.contact_address = contact_address;

            recruiter =  await recruiter.save();
            return recruiter;
        } catch (err) {
            return err.message;
        }
    }

    /**
     * Signin to Recruiter Account
     */
    public signIn = async (recruiter:Recruiter) => {
        const { username, email, password } = recruiter;
        const signInRecruiter = await Recruiter.find({username, email, password});
        if (!signInRecruiter) {
            return
        }
        try {
            return await signInRecruiter;
        } catch (error) {
            return error.message
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
    public updateOne =async (recruiter:Recruiter, id:number) => {
        const { first_name, last_name, username, email, password, company_name, contact_tel, contact_address } = recruiter;
        const updateRecruiter = await Recruiter.findOne(id)
        if (!updateRecruiter){
            return
        }
        try {
            updateRecruiter.first_name = first_name;
            updateRecruiter.last_name = last_name;
            updateRecruiter.username = username;
            updateRecruiter.password = password;
            updateRecruiter.email = email;
            updateRecruiter.company_name = company_name;
            updateRecruiter.contact_tel = contact_tel;
            updateRecruiter.contact_address = contact_address;

            return await updateRecruiter.save();
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