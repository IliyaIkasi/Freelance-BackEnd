import * as express from "express";
import { jobService } from "../service/job.service";
const router = express.Router();

const jobRoute = new jobService();

router.post('/api/job/signup', jobRoute.createJob)
router.get('/api/job/', jobRoute.fetchAll);
router.get('/api/job/:id', jobRoute.fetchOne);
router.put('/api/job/:id', jobRoute.updateOne);
router.delete('/api/job/:id', jobRoute.deleteOne);

export {
    router as jobRoute
}