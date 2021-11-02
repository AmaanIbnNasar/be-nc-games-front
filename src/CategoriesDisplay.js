import React from "react";
import { baseUrl, useApi } from "./api";
const CategoriesDisplayInner = ({ categoryData }) => (
  <div className="bg-dark bg-gradient text-white p-4 rounded">
    <pre>
      <code>{categoryData}</code>
    </pre>
  </div>
);

const CategoriesDisplay = () => {
  let [categoryData, error] = useApi("/api/categories");
  categoryData = JSON.stringify(categoryData, null, 2);
  return (
    <div className="container">
      <h1>Categories Data</h1>
      {categoryData ? (
        <CategoriesDisplayInner categoryData={categoryData} />
      ) : error ? (
        error
      ) : (
        "LOADING"
      )}
    </div>
  );
};

export default CategoriesDisplay;
