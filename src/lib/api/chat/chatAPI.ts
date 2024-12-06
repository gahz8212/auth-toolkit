import client from "../client";
export const addImage = (formData: FormData) => {
  return client.post("/home/images", formData);
};
export const getChats = () => {
  return client.get("/home/all");
};
