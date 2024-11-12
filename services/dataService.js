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
