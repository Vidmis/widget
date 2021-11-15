import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "",
});

const httpService = {
  get: (url: string) => {
    return AxiosInstance.get(url)
  },

  post: (url: string, data: any) => {
    return AxiosInstance.post(url, data)
  },
};

export default httpService;
