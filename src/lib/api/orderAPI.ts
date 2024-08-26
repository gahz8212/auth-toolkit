import client from "./client";
export const orderInput = (order: any[] | null) => {
  return client.post("/order/orderinput", { order });
};
export const goodInput = (good: any[] | null) => {
  return client.post("/order/goodinput", { good });
};
export const getOrderData = () => {
  return client.get("/order/getOrderData");
};
export const getDummyItem = () => {
  return client.get("/order/getDummyItem");
};
export const palletInput = (palletData: {
  [key: string]: { [key: string]: string | number }[];
}) => {
  console.log("palletData", palletData);
  return client.post("/order/palletData", palletData);
};
