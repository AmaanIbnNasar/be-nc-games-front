import { useState, useEffect, useCallback } from "react";

export const baseUrl = "https://nc-games-amaan.herokuapp.com";

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(baseUrl + endpoint);
        if (!(resp.status >= 200 && resp.status < 300)) {
          throw new Error("status code: " + resp.status);
        }
        const data = await resp.json();
        setData(data);
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      }
    })();
  }, [endpoint]);
  return [data, error, setData];
};

export const useApiCallback = (endpoint, options, setDataCallback) => {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);

  const cb = () => {
    (async () => {
      setState("loading");
      try {
        const resp = await fetch(baseUrl + endpoint, options);
        if (!(resp.status >= 200 && resp.status < 300)) {
          throw new Error("status code: " + resp.status);
        }
        const data = await resp.json();
        setDataCallback(data);
        setState("idle");
      } catch (err) {
        console.log(err);
        setState("error");
        setError("Something went wrong");
      }
    })();
  };
  return [state, error, cb];
};
