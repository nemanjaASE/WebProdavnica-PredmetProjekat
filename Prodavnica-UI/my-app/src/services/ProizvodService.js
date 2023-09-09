import api from "../helpers/ConfigHelper";

export const getAllProducts = async () => {
  return await api.get(`/proizvod/get-sve-proizvode`)
}

export const getMyProducts = async () => {
  return await api.get(`/proizvod/get-moje-proizvode`);
};

export const getProductById = async (id) => {
  return await api.get(`/proizvod/` + id);
};

export const createNewProduct = async (productData) => {
  return await api.post(`/proizvod`, productData, {headers: {"Content-Type":"multipart/form-data"}});
};

export const updateProduct = async (productData) => {
  return await api.put(`/proizvod` , productData,{headers: {"Content-Type":"multipart/form-data"}});
};

export const deleteProduct = async (id) => {
  return await api.delete(`/proizvod/` + id);
};