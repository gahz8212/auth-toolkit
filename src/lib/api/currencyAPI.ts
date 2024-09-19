import client from "./client";
export const currency = (endPoint: string) => {
  return client.get(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${endPoint}.json`
  );
};
