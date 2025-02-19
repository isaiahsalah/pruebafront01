import axios from "axios";
import { urlUser, urlApi } from "./api";
import { UserInterface } from "../interfaces/userInterface";

// Obtiene todos los usuarios
export const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const response = await axios.get(urlApi + urlUser);
    const dataList: UserInterface[] = response.data.map(
      (item: UserInterface) => ({
        id: item.id,
        name: item.name,
        birthDate: item.birthDate,
        profession: item.profession,
        nationality: item.nationality,
        phone: item.phone,
        email: item.email,
        salary: item.salary,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    );
    return dataList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Busca un usuario específico por ID
export const getUser = async (dataId: number): Promise<UserInterface> => {
  try {
    const response = await axios.get(`${urlApi}${urlUser}${dataId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${dataId}:`, error);
    throw error;
  }
};

// Añade un nuevo usuario
export const addUser = async (item: UserInterface): Promise<number> => {
  const newData: UserInterface = {
    name: item.name,
    birthDate: item.birthDate,
    profession: item.profession,
    nationality: item.nationality,
    phone: item.phone,
    email: item.email,
    salary: item.salary,
  };

  try {
    const response = await axios.post(urlApi + urlUser, newData);
    return response.status;
  } catch (error) {
    console.error("Error adding user:", error);
    return 400;
  }
};

// Edita un usuario existente
export const editUser = async (data: UserInterface): Promise<number> => {
  try {
    const response = await axios.put(`${urlApi}${urlUser}${data.id}`, data);
    return response.status;
  } catch (error) {
    console.error("Error editing user:", error);
    return 400;
  }
};

// Elimina un usuario
export const deleteUser = async (id: number): Promise<number> => {
  try {
    const response = await axios.delete(`${urlApi}${urlUser}${id}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting user:", error);
    return 400;
  }
};
