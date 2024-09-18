import client from "./client";
export const currency = (currency: {
  fromCurrency: string;
  toCurrency: string;
}) => {
  console.log("currency", currency);
  return client.get(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currencty-api@1/latest/currencies/${currency.fromCurrency}/${currency.toCurrency}.min.json`
  );
};
