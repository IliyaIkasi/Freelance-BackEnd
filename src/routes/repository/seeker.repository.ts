import { response } from "express";
import { EntityRepository, Repository } from "typeorm";
import { Seeker } from "../../entities/seeker.entity";
import { Exists } from "../../status_code/status";

@EntityRepository(Seeker)
export class SeekerRepository extends Repository<Seeker> {
    /**
     * SignIn Job Seeker
     */
    public signUp = async(seeker:Seeker) => {
        const { first_name, last_name, username, email, password, phone_number, location, experience, skills, qualification } = seeker;

        const check = await Seeker.findOne({email});
        if(check) return Exists;
        
        try {
            let seeker = new Seeker();
            seeker.first_name = first_name;
            seeker.last_name = last_name;
            seeker.username = username;
            seeker.email = email;
            seeker.password = password;
            seeker.phone_number = phone_number;
            seeker.location = location;
            seeker.experience = experience;
            seeker.skills = skills;
            seeker.qualification = qualification;

            seeker = await seeker.save();
            return seeker;
        } catch (error) {
            return error.message;
        }
    }
    
    /**
     * Fetch All Job Seeker
     */
     public fetchAll = async() => {
        return await Seeker.find();
    }
    
    /**
     * Fetch One Job Seeker
     */
     public fetchOne  = async(id:number) => {
        return await Seeker.findOne(id);
    }
    
    /**
     * Update One Job Seeker
     */
     public updateOne  = async(seeker: Seeker, id:number) =>  {
        const { first_name, last_name, username, email, password, phone_number, location, experience, skills, qualification } = seeker;
        const updateSeeker = await Seeker.findOne(id);
        if (!updateSeeker) {
            return
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
    }
    
    /**
     * Delete One Job Seeker
     */
     public deleteOne  = async(id:number) =>  {
        return await Seeker.delete(id)
    }
}