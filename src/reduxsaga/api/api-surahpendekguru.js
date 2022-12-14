import axios from "axios";
import config from "../config/config";

// GET
const list = async (payload) => {
  try {
    const result = await axios.get(
      `${config.domain}/surahpendekguru/list/${payload.id}`
    );
    console.log(result);
    return result.data;
  } catch (error) {
    return error;
  }
};

// GETLISTAWAL
const listawal = async () => {
  try {
    const result = await axios.get(`${config.domain}/surahpendekguru/listawal`);
    console.log(result);
    return result.data;
  } catch (error) {
    return error;
  }
};

// CREATE
const createsurahpendek = async (payload) => {
  console.log("SAMPAI DISINI");
  console.log(payload);
  try {
    const result = await axios.post(
      `${config.domain}/surahpendekguru`,
      payload
    );
    console.log(result);
    return result.data;
  } catch (error) {
    return error;
  }
};

// GETID
const getsurahpendekid = async (payload) => {
  console.log("SAMPAI DISINI");
  console.log(payload.id);
  try {
    const result = await axios.get(
      `${config.domain}/surahpendekguru/${payload.id}`
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

// GETBYRUMAHTAHFIDZ
const getsurahpendekrumahtahfidz = async (payload) => {
  console.log("SAMPAI DISINI");
  console.log(payload);
  try {
    const result = await axios.get(
      `${config.domain}/surahpendekguru/byrumahtahfidz/${payload}`
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

// GETBYMASTERTAHFIDZ
const getsurahpendekmastertahfidz = async (payload) => {
  console.log("SAMPAI DISINI");
  console.log(payload);
  try {
    const result = await axios.get(
      `${config.domain}/surahpendekguru/bymastertahfidz/${payload}`
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updatesurahpendek = async (payload) => {
  console.log("SAMPAI DISINI");
  const id = payload.id;
  console.log(payload);
  try {
    const result = await axios.put(
      `${config.domain}/surahpendekguru/${id}`,
      payload
    );
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

// DELETE
const deletesurahpendek = async (payload) => {
  try {
    const result = await axios.delete(
      `${config.domain}/surahpendekguru/${payload}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list,
  listawal,
  createsurahpendek,
  getsurahpendekid,
  updatesurahpendek,
  deletesurahpendek,
  getsurahpendekrumahtahfidz,
  getsurahpendekmastertahfidz,
};
