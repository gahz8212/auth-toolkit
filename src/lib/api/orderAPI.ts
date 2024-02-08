import client from "./client";
export const orderInput = (order: any[] | null) => {
  return client.post("/order/input", { order });
};
