import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api")
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Frontend is working!</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;

