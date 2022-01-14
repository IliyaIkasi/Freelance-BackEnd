import * as express from "express";
import { recruiterService } from "./recruiter.service";

const router = express.Router();
const recruiterRoute = new recruiterService();

router.post('/api/recruiter/signup', recruiterRoute.signUp);
router.post('/api/recruiter/login', recruiterRoute.signIn);
router.get('/api/recruiter',recruiterRoute.fetchAll);
router.get('/api/recruiter/:id', recruiterRoute.fetchOne);
router.put('/api/recruiter/:id', recruiterRoute.updateOne);
router.delete('/api/recruiter/:id', recruiterRoute.deleteOne);


export{
    router as RecruiterRoute
}