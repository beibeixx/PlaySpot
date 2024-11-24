//Stores all the helper function for the reference data playgrounds.json
import data from "../data/playgrounds.json";

export const fetchData = () => {
  return data;
};

export const getItemById = (id) => {
  return data.find((item) => item.id === id);
};

export const getItemNameById = (id) => {
  return data.find((item) => item.id === id).name;
};

export const getItemImageById = (id) => {
  return data.find((item) => item.id === id).images[0];
};

export const getImagesById = (id) => {
  const item = data.find((item) => item.id === id);
  const images = item ? item.images : [];
  return images;
};

export const getAddressById = (id) => {
  return data.find((item) => item.id === id).address;
};
