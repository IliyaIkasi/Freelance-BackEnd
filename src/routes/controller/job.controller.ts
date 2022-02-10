import * as express from "express";
import { auth } from "../../middleware/auth.middleware";
import { jobService } from "../service/job.service";
const router = express.Router();

const jobRoute = new jobService();

router.post("/api/job/create", auth, jobRoute.createJob);
router.get("/api/job/", auth, jobRoute.fetchAll);
router.get("/api/job/:id", auth, jobRoute.fetchOne);
router.put("/api/job/:id", auth, jobRoute.updateOne);
router.delete("/api/job/:id", auth, jobRoute.deleteOne);

export { router as jobRoute };
