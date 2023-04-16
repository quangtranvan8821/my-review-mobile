import axiosInstance from '../utils/axiosInstance'
import { API_HOST } from '@env'

export const fetchApi = async (url, method = 'get', body, headers) => {
  try {
    let opts = {
      method,
      url: `${API_HOST}${url}`,
      Accept: 'application/json',
    }

    if (headers) {
      opts = {
        ...opts,
        headers: {
          ...headers,
          [headers.key]: headers.value,
        },
      }
    }
    if (method === 'get') {
      opts.params = body
    } else {
      opts.data = body
    }
    let fetchdata = await axiosInstance(opts)
    return fetchdata
  } catch (error) {
    console.log(error)
    return error
  }
}

export const fetchApiUpload = async (url, method = 'get', body) => {
  try {
    let opts = {
      method,
      url: `${API_HOST}${url}`,
      timeout: 60 * 1000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
    if (method === 'get') {
      opts.params = body
    } else {
      opts.data = body
    }
    let fetchdata = await axiosInstance(opts)
    return fetchdata
  } catch (error) {
    return error
  }
}
