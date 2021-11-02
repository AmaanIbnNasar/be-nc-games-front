import React from "react";
import { useEffect, useState } from "react";
import { baseUrl } from "./api";
const CategoriesDisplayInner = ({ categoryData }) => (
  <div className="bg-dark bg-gradient text-white p-4 rounded">
    <pre>
      <code>{categoryData}</code>
    </pre>
  </div>
);

const CategoriesDisplay = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(baseUrl + "/api/categories");
        const data = await resp.json();
        setCategoryData(JSON.stringify(data, null, 2));
      } catch (err) {
        setError("Something when wrong");
      }
    })();
  }, []);

  return (
    <>
      <h1>Categories Data</h1>
      {categoryData ? (
        <CategoriesDisplayInner categoryData={categoryData} />
      ) : error ? (
        error
      ) : (
        "LOADING"
      )}
    </>
  );
};

export default CategoriesDisplay;
