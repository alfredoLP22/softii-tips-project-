import type { Tip } from "../types/Tip.type";

const API_BASE_URL = "http://localhost:3000/api/tips";

export async function startTipProcess(
  totalAmount: number,
  splitCount: number
): Promise<Tip> {
  const response = await fetch(`${API_BASE_URL}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ totalAmount, splitCount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to start tip process");
  }

  return response.json();
}

export async function payTip(
  tipId: string,
  amount: number,
  method: string
): Promise<Tip> {
  const response = await fetch(`${API_BASE_URL}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipId, amount, method }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to register payment");
  }

  return response.json();
}
