import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [states, setStates] = useState({
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setStates({
            ...states,
            isLoading: false,
            error: err.message,
          });
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, states };
};

export default useFetch;
