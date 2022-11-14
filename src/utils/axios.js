import axios from "axios";

export const getAll = (url, abortContoller) =>
  axios.get(url, { singal: abortContoller.signal });

export const getById = (url, id, abortContoller) =>
  axios.get(`${url}/${id}`, { singal: abortContoller.signal });

export const post = (url, data) =>
  axios.post(url, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
export const put = (url, id, data) =>
  axios.put(`${url}/${id}`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const axiosDelete = (url, id) => axios.delete(`${url}/${id}`);
