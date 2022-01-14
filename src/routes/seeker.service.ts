import { Request, Response } from "express";
import { Seeker } from "../entities/seeker.entity";
import { Created, InternalServer, InternalServer_Code, Ok, Ok_Code } from "../status_code/status";
import { SeekerRepository } from "./repository/seeker.repository";

export class seekerService {
    private readonly seekerRepository = new SeekerRepository();
    constructor() {
        this.seekerRepository = this.seekerRepository;
    };

    public signUp = async (req: Request, res: Response) => {
        const seeker: Seeker = req['body'];
        try {
            const signUpSeeker = await this.seekerRepository.signUp(seeker);
            return res.status(Ok_Code).json({
                message: 'Create' + Ok,
                signUpSeeker
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            })
        }
    }

    public fetchAll = async (req: Request, res: Response) => {
        try {
            const allSeeker = await this.seekerRepository.fetchAll();
            return res.status(Ok_Code).json({
                message: Ok,
                allSeeker
            });
        } catch (error) {
            console.log(InternalServer_Code);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            });
        };
    }

    public fetchOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const oneSeeker = await this.seekerRepository.fetchOne(+id);
            return res.status(Ok_Code).json({
                message: Ok + 'yey',
                oneSeeker
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            })
        }
    }

    public updateOne = async (req: Request, res: Response) => {
        const seeker: Seeker = req['body'];
        const { id } = req.params;
        try {
            const updateSeeker = await this.seekerRepository.updateOne(seeker, +id);
            return res.status(Ok_Code).json({
                message: 'Update' + Ok,
                updateSeeker
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                messge: InternalServer
            })
        }
    }

    public deleteOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleteSeeker = await this.seekerRepository.deleteOne(+id);
            return res.status(Ok_Code).json({
                message: Ok,
                deleteSeeker
            })
        } catch (error) {
            console.log(error.message);
            return res.status(InternalServer_Code).json({
                message: InternalServer
            })
        }
    }
}