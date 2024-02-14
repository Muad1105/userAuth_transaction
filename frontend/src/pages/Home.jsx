import React, { useEffect, useState } from "react";
import axios from "axios";

import Transactions from "../components/Transactions";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserId, setUserName } from "../redux/userReducer";
import Navbar from "../components/Navbar";

const Home = () => {
  useEffect(() => {
    sendRequest();
  }, []);

  const dispatch = useDispatch();

  const sendRequest = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/home", {
        withCredentials: true,
      });
      console.log(response.data.user);
      const resUserData = response.data.user;

      const userData = {
        id: resUserData._id,
        email: resUserData.email,
        name: resUserData.username,
      };
      dispatch(setUserId(userData.id));
      dispatch(setUserName(userData.name));
      dispatch(setUserEmail(userData.email));

      // Handle successful response
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Transactions />
    </div>
  );
};

export default Home;
