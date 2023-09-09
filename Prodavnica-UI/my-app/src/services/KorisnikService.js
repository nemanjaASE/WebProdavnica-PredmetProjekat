import api from "../helpers/ConfigHelper";

export const register = async (registerData) => {
  return await api.post(`/korisnik`, registerData, {headers: {"Content-Type":"multipart/form-data"}});
};

export const update = async (updateData) => {
  return await api.put(`/korisnik`, updateData, {headers: {"Content-Type":"multipart/form-data"}});
};

export const getAllSalesmans = async () => {
  return await api.get(`/korisnik/get-prodavci`);
};

export const getMyProfile = async () => {
  return await api.get(`/korisnik/get-profil`);
};

export const acceptVerification = async (id) => {
  return await api.put(`/korisnik/prihvati-verifikaciju/`+ id);
};

export const denyVerification = async (id) => {
  return await api.put(`/korisnik/odbij-verifikaciju/` + id);
};