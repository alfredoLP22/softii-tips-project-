import { Request, Response } from "express";
import { TipService } from "../services/tip.service";

export class TipController {
  private tipService: TipService;

  constructor() {
    this.tipService = new TipService();
  }

  public async startTipProcess(req: Request, res: Response): Promise<void> {
    const { totalAmount, splitCount } = req.body;

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      res.status(400).json({ message: "Invalid totalAmount" });
      return;
    }

    const count = splitCount === undefined ? 1 : Number(splitCount);

    try {
      const newTip = await this.tipService.initializeTip(totalAmount, count);
      res.status(201).json(newTip);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async payTip(req: Request, res: Response): Promise<void> {
    const { tipId, amount, method } = req.body;

    if (!tipId || typeof amount !== "number" || amount <= 0 || !method) {
      res.status(400).json({ message: "Missing or invalid payment details" });
      return;
    }

    try {
      const updatedTip = await this.tipService.registerPayment(
        tipId,
        amount,
        method
      );
      res.status(200).json(updatedTip);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment registration failed";
      res.status(400).json({ message: errorMessage });
    }
  }

  public async getTipDetails(req: Request, res: Response): Promise<void> {
    const { tipId } = req.params;

    try {
      const tip = await this.tipService.findTipById(tipId);
      if (!tip) {
        res.status(404).json({ message: "Tip process not found" });
        return;
      }
      res.status(200).json(tip);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
