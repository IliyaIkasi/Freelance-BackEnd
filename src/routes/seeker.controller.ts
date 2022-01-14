import * as express from "express";
import { seekerService } from "./seeker.service";

const router = express.Router();
const seekerRoute = new seekerService();

router.post('/api/seeker/signup', seekerRoute.signUp);
router.get('/api/seeker/', seekerRoute.fetchAll);
router.get('/api/seeker/:id', seekerRoute.fetchOne);
router.put('/api/seeker/:id', seekerRoute.updateOne);
router.delete('/api/seeker/:id', seekerRoute.deleteOne);

export{
    router as SeekerRoute
}