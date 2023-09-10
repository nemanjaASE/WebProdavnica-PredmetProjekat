import api from "../helpers/ConfigHelper";

export const getAllOrders = async () => {
  return await api.get(`/porudzbina/get-all-porudzbinas`);
};
export const getCustomerDeliveredOrders = async () => {
  return await api.get(`/porudzbina/get-porudzbine-kupca-dostavljene`);
};
export const getSalesmanDeliveredOrders = async () => {
  return await api.get(`/porudzbina/get-porudzbine-prodavca-dostavljene`);
};

export const getCustomerInProgressOrders = async () => {
  return await api.get(`/porudzbina/get-porudzbine-kupca-u-toku`);
};
export const getSalesmanInProgressOrders = async () => {
  return await api.get(`/porudzbina/get-porudzbine-prodavca-u-toku`);
};

export const createOrder = async (orderData) => {
  return await api.post(`/porudzbina/kreiranje-porudzbine`, orderData);
};

export const denyOrder = async (id) => {
  return await api.put(`/porudzbina/odbij-porudzbinu/`+id);
};

export const approveOrder = async (id) => {
  return await api.put(`/porudzbina/approve-order/`+id);
}