import "./App.css";

import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import { getUserData } from "./api";
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      setData(getUserData);
    };
    fetchData();
  }, []);
  return data ? <UserForm preloadedData={data} /> : <div>Loading...</div>;
}

export default App;
