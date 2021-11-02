import { useEffect, useState } from "react";
import { baseUrl, useApi } from "./api";
const ApiDisplayInner = ({ apiData }) => (
  <div className="bg-dark bg-gradient text-white p-4 rounded">
    <pre>
      <code>{apiData}</code>
    </pre>
  </div>
);

const ApiDisplay = () => {
  let [apiData, error] = useApi("/api");
  apiData = JSON.stringify(apiData, null, 2);
  return (
    <div className="container">
      <h1>Endpoint Data</h1>
      {apiData ? (
        <ApiDisplayInner apiData={apiData} />
      ) : error ? (
        error
      ) : (
        "LOADING"
      )}
    </div>
  );
};

export default ApiDisplay;
