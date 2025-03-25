import { getSummary } from "@/controllers/summary";
import { Router } from "express";

const router = Router();

router.get("/", getSummary);

export { router as summaryRouter };
