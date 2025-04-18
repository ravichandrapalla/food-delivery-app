import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState();
  useEffect(() => {
    async function getData() {
      const resp = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/${url}`
      );
      setData(resp);
    }
    getData();
  }, [url]);
  return { data };
}
