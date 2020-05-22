import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import TableUser from "./components/Table";
import Popup from "./components/Popup";
interface AppProps {
  visible: boolean;
  status: string;
  form?: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    province: string | number;
    khet: string | number;
    khwang: string | number;
    zipcode: string | number;
  };
}
function App() {
  const [useUsers, setUsers] = useState([]);
  const [useProvince, setProvince] = useState({});
  const [usePopup, setPopup] = useState<AppProps>({
    visible: false,
    status: "insert",
    form: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      province: "",
      khet: "",
      khwang: "",
      zipcode: "",
    },
  });
  const fetchProvince = async () => {
    const response = await fetch("/api/province").then((res) => res.json());
    setProvince(response);
  };
  const fetchUserData = async () => {
    const response = await fetch("/api/user").then((res) => res.json());
    setUsers(response);
  };
  useEffect(() => {
    fetchProvince();
    fetchUserData();
  }, []);
  return (
    <div className="App">
      <div className="button-add">
        <Button
          type="primary"
          onClick={() => setPopup({ ...usePopup, visible: true })}
        >
          Add
        </Button>
      </div>
      <TableUser useUsers={useUsers} setUsers={setUsers} setPopup={setPopup} />
      <Popup
        statePopup={usePopup}
        setPopup={setPopup}
        useProvince={useProvince}
        fetchUserData={fetchUserData}
      />
    </div>
  );
}

export default App;
