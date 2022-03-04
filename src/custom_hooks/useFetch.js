import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("Couldn't fetch data from the resource");
        }
        return response.json();
      })
      .then((data) => {
        // sort data descending ascending
        let descendingData = data.slice().sort((a, b) => b.id - a.id);
        setData(descendingData);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Abort error occurred");
        } else {
          setError(error.message);
          setIsPending(false);
        }
      });
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
