import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserEmail, setUserId, setUserName } from "../redux/userReducer";

axios.defaults.withCredentials = true;
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:3001/user/logout",
      null,
      {
        withCredentials: true,
      }
    );
    console.log(response.status);
    if (response.status == 200) {
      navigate("/login", { replace: true });
      dispatch(setUserId(""));
      dispatch(setUserName(""));
      dispatch(setUserEmail(""));
    }
  };

  return (
    <Button variant="contained" size="small" onClick={() => handleLogout()}>
      Logout
    </Button>
  );
};

export default Logout;
