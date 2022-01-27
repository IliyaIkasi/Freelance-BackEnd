import * as express from "express";
import { auth } from "../../middleware/auth.middleware";
import { seekerService } from "../service/seeker.service";

const router = express.Router();
const seekerRoute = new seekerService();

router.post("/api/seeker/signup", seekerRoute.signUp);
router.post("/api/seeker/login", seekerRoute.signIn);
router.get("/api/seeker/", seekerRoute.fetchAll);
router.get("/api/seeker/:id", seekerRoute.fetchOne);
router.put("/api/seeker/:id", auth, seekerRoute.updateOne);
router.delete("/api/seeker/:id", auth, seekerRoute.deleteOne);

export { router as SeekerRoute };
