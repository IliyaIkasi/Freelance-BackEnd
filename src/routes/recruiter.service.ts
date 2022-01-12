import { Request, Response } from 'express';
import { InternalServer, InternalServer_Code, NotFound, NotFound_Code, Ok, Ok_Code } from '../status_code/status';
import { Signin } from '../user/signin';
import { RecruiterRepository } from './repository/recruiter.repository';

export class recruiterService {
    private readonly recruiterRepository = new RecruiterRepository();
    constructor() {
        this.recruiterRepository = this.recruiterRepository;
    };

    public signIn = async (req: Request, res: Response) => {
        const signin: Signin = req['body'];
        try {
            const signInRecruiter = await this.recruiterRepository.signIn(signin);
            return res.status(Ok_Code).json({
                message: "Create " + Ok,
                signInRecruiter
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            })
        }
    }

    public fetchAll = async (req: Request, res: Response) => {
        const allRecruiters = await this.recruiterRepository.fetchAll();
        return res.status(Ok_Code).json({
            message: Ok,
            allRecruiters
        });
    }

    public fetchOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const oneRecruiter = await this.recruiterRepository.fetchOne(+id);
            if (oneRecruiter) {
                return res.status(Ok_Code).json({
                    message: Ok,
                    oneRecruiter
                })
            }
            return res.status(NotFound_Code).json({
                message: NotFound
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer,
            });
        }
    }

    public updateOne = async (req: Request, res: Response) => {
        const signin: Signin = req['body'];
        const { id } = req.params;
        try {
            const updateRecruiter = await this.recruiterRepository.updateOne(signin, +id);
            if (updateRecruiter) {
                return res.status(Ok_Code).json({
                    message: 'Update ' + Ok,
                    updateRecruiter
                })
            }
            return res.status(NotFound_Code).json({
                message: NotFound
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            })
        }
    }

    public deleteOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleteRecruiter = await this.recruiterRepository.deleteOne(+id);
            if (deleteRecruiter.affected === 0) {
                return res.status(NotFound_Code).json({
                    message: NotFound
                })
            }
            return res.status(Ok_Code).json({
                message: "Delete" + Ok,
                deleteRecruiter
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            })
        }
    }
}