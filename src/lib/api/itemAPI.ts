import client from "./client";
export const addImage = (images: FormData) => {
  return client.post("item/images", images);
};
export const addItem = (item: {
  category: string;
  name: string;
  descript: string;
  unit: string;
  price: number;
  count: number;
  use: boolean;
  supplyer: string;
  imageList: { url: string }[];
}) => {
  return client.post("item/item", item);
};
export const getItem = () => {
  return client.get("/item/items");
};
export const editItem = (item: {
  [key: string]: "" | number | string | { url: string }[] | boolean;
}) => {
  console.log(item);
  return client.post("/item/edit", item);
};
export const removeItem = (id: number | "") => {
  console.log("deleteID", id);
  return client.delete(`/item/delete/${id}`);
};
