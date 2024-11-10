import data from '../data/playgrounds.json'

export const fetchData = () => {
    return data;
}

export const getItemById = (id) => {
    return data.find(item => item.id === id);
  };