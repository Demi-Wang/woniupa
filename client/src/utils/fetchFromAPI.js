import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const KEY = process.env.REACT_APP_KEY;

const options = {
  url: BASE_URL,
  params: {
    // url后面带的参数
    part: "snippet",
    maxResults: 50, // default: 5
    key: KEY,
  },
  headers: {},
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    // console.log("fetch url: ", `${BASE_URL}/${url}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
