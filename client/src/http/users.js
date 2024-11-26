import api from "@/http/axios";

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: user?.token ? `Bearer ${user.token}` : undefined,
    },
  };
};

export const getUsers = async () => await api.get("/users", getHeaders());

export const blockUsers = async (ids) => await api.post("/users/block", ids, getHeaders());

export const unblockUsers = async (ids) => await api.post("/users/unblock", ids, getHeaders());

export const deleteUsers = async (ids) => await api.post("/users/delete", ids, getHeaders());