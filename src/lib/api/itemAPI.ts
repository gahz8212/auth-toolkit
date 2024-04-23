import client from "./client";
export const addImage = (images: FormData) => {
  return client.post("item/images", images);
};
export const addItem = (item: {
  type: string;
  groupType: string;
  groupName: string;
  category: string;
  itemName: string;
  descript: string;
  unit: string;
  im_price: number;
  ex_price: number;
  use: boolean;
  supplyer: string;
  imageList: { url: string }[];
}) => {
  item.unit = item.unit.slice(0, 1);
  // console.log(item);

  return client.post("item/item", item);
};
export const getItem = () => {
  return client.get("/item/items");
};
export const editItem = (item: {
  [key: string]: "" | number | string | { url: string }[] | boolean;
}) => {
  return client.post("/item/edit", item);
};
export const removeItem = (id: number | "") => {
  // console.log("deleteID", id);
  return client.delete(`/item/delete/${id}`);
};
export const excelAdd = (datas: any[] | null) => {
  // console.log("exceldatas", datas);
  return client.post("/item/excelAdd", datas);
};
