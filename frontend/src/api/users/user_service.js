import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getUsers = () => {
  return axiosInstance.get("/users");
};

const createUser = (data) => {
  return axiosInstance.post("/users/post", data);
};

const editUsers = (id) => {
  return axiosInstance.get("/users/edit", {
    params: {
      userID: id,
    },
  });
};

const updateUser = (id, data) => {
  return axiosInstance.put(`/users/edit/${id}`, data);
};

const deleteUser = (id) => {
  return axiosInstance.delete(`/users/delete/${id}`);
};

export { getUsers, createUser, editUsers, updateUser, deleteUser };
