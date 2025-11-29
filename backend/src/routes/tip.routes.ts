import { Router } from "express";
import { TipController } from "../controllers/tip.controller";

const router = Router();
const tipController = new TipController();

router.post("/start", (req, res) => tipController.startTipProcess(req, res));
router.post("/pay", (req, res) => tipController.payTip(req, res));
router.get("/:tipId", (req, res) => tipController.getTipDetails(req, res));

export default router;
