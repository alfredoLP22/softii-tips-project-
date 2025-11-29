import { Tip, TipPayment } from "../models/Tip";

const tips: Tip[] = [];

export class TipService {
  public async initializeTip(
    totalAmount: number,
    splitCount: number
  ): Promise<Tip> {
    const amountPerPerson =
      splitCount > 0 ? totalAmount / splitCount : totalAmount;
    const newTip: Tip = {
      id: Date.now().toString(),
      totalAmount,
      splitCount,
      amountPerPerson: parseFloat(amountPerPerson.toFixed(2)),
      payments: [],
      remainingAmount: totalAmount,
    };
    tips.push(newTip);
    return newTip;
  }

  public async findTipById(id: string): Promise<Tip | undefined> {
    return tips.find((tip) => tip.id === id);
  }

  public async registerPayment(
    tipId: string,
    amount: number,
    method: string
  ): Promise<Tip> {
    const tip = await this.findTipById(tipId);

    if (!tip) {
      throw new Error("Tip not found");
    }

    if (tip.remainingAmount < amount) {
      throw new Error("Payment exceeds remaining amount");
    }

    const newPayment: TipPayment = {
      id: Date.now().toString(),
      amount,
      method,
      timestamp: new Date(),
    };

    tip.payments.push(newPayment);
    tip.remainingAmount -= amount;

    return tip;
  }
}
