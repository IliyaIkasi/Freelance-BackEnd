import * as express from "express";
import { auth } from "../../middleware/auth.middleware";
import { recruiterService } from "../service/recruiter.service";

const router = express.Router();
const recruiterRoute = new recruiterService();

router.post("/api/recruiter/signup", recruiterRoute.signUp);
router.post("/api/recruiter/login", recruiterRoute.signIn);
router.get("/api/recruiter", recruiterRoute.fetchAll);
router.get("/api/recruiter/:id", recruiterRoute.fetchOne);
router.put("/api/recruiter/:id", auth, recruiterRoute.updateOne);
router.delete("/api/recruiter/:id", auth, recruiterRoute.deleteOne);

export { router as RecruiterRoute };
