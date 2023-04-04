import axiosInstance from "../utils/axiosInstance";
import { MY_REVIEW_SERVER } from "@env";

export const fetchApi = async (url, method = "get", body, headers) => {
  try {
    let opts = {
      method,
      url: `${MY_REVIEW_SERVER}${url}`,
      timeout: 1 * 1000 * 60, //1phut
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    if (headers) {
      opts = {
        ...opts,
        headers: {
          ...headers,
          [headers.key]: headers.value,
        },
      };
    }
    if (method === "get") {
      opts.params = body;
    } else {
      opts.data = body;
    }
    let fetchdata = await axiosInstance(opts);

    return fetchdata;
  } catch (error) {
    return error;
  }
};

export const fetchApiUpload = async (url, method = "get", body) => {
  try {
    let opts = {
      method,
      url: `${MY_REVIEW_SERVER}${url}`,
      timeout: 1 * 1000 * 60, //1phut
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    if (method === "get") {
      opts.params = body;
    } else {
      opts.data = body;
    }
    let fetchdata = await axiosInstance(opts);

    return fetchdata;
  } catch (error) {
    return error;
  }
};
