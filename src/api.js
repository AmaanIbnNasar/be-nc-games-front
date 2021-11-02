import React from "react";
import { useState, useEffect } from "react";

export const baseUrl = "https://nc-games-amaan.herokuapp.com";

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(baseUrl + endpoint);
        const data = await resp.json();
        setData(data);
      } catch (err) {
        setError("Something when wrong");
      }
    })();
  }, [endpoint]);
  return [data, error];
};
