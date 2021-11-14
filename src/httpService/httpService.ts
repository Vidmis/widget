import axios from "axios";

const httpService = () => {
  const makeGet = (url) =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => err);

  const makePost = (url, data) =>
    axios
      .post(url, data)
      .then((res) => res)
      .catch((err) => err);

  return { makeGet, makePost };
};

export default httpService;
