import { getSummary } from "../../controllers/summary";
import { validateJWT } from "../../middlewares/jwt";
import { Router } from "express";

const router = Router();

router.get("/", validateJWT, getSummary);

export { router as summaryRouter };
