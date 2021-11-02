import { useEffect, useState } from "react";
import { baseUrl } from "./api";
const ApiDisplayInner = ({ apiData }) => (
  <div className="bg-dark bg-gradient text-white p-4 rounded">
    <pre>
      <code>{apiData}</code>
    </pre>
  </div>
);

const ApiDisplay = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(baseUrl + "/api");
        const data = await resp.json();
        setApiData(JSON.stringify(data, null, 2));
      } catch (err) {
        setError("Something went wrong");
      }
    })();
  }, []);

  return (
    <>
      <h1>Endpoint Data</h1>
      {apiData ? (
        <ApiDisplayInner apiData={apiData} />
      ) : error ? (
        error
      ) : (
        "LOADING"
      )}
    </>
  );
};

export default ApiDisplay;
