import axios from "axios";

const httpService = () => {
  const makeGetOutput = (res) => {
    return res;
  };

  const makeGet = (url) => {
    axios
      .get(url)
      .then((res) => makeGetOutput(res.data))
      .catch((err) => console.log(err));
  };
  const makePost = (url, data) => {
    axios
      .post(url, data)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  return { makeGet, makePost, makeGetOutput };
};

export default httpService;
