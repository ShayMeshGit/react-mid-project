import axios from "axios";

export const getAll = (url, abortContoller) =>
  axios.get(url, { singal: abortContoller.signal });

export const getById = (url, id, abortContoller) =>
  axios.get(`${url}/${id}`, { singal: abortContoller.signal });

export const getByUserId = (url, userId, abortContoller) =>
  axios.get(`${url}?userId=${userId}`, { singal: abortContoller.signal });
