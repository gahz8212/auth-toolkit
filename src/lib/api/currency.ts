import client from "./client";
export const currency = () => {
  return client.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currencty-api@1/latest/currencies/${fromCurrency}/${tocurrency}.min.json`);
};