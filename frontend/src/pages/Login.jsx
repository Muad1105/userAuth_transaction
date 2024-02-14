import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";

const Login = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [noUser, setNoUser] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    if (!userLoginData.email || !userLoginData.password) {
      return;
    }
    const data = {
      email: userLoginData.email,
      password: userLoginData.password,
    };
    try {
      const res = await axios.post("http://localhost:3001/user/login", data);
      console.log(res.status);
      if (res.status === 200) {
        enqueueSnackbar("Login", {
          variant: "success",
        });

        navigate("/home");
      }
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 404) setNoUser(true);
      if (err.response.status === 401) setIncorrectCredentials(true);
    }
  };

  const handleOnChangeEmail = (e) => {
    setNoUser(false);
    setIncorrectCredentials(false);
    setUserLoginData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleOnChangePassword = (e) => {
    setNoUser(false);
    setUserLoginData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center m-[100px] gap-y-6">
      <div className="text-[20px] font-bold">Login</div>
      <div className="flex">
        <label htmlFor="">Email</label>
        <div className="">
          <input
            style={{ border: "1px solid blue" }}
            type="text"
            onChange={(e) => handleOnChangeEmail(e)}
          />
        </div>
      </div>
      <div className="flex">
        <label htmlFor="">Password</label>
        <div>
          <input
            style={{ border: "1px solid blue" }}
            type="text"
            onChange={(e) => handleOnChangePassword(e)}
          />
        </div>
      </div>
      <Button
        onClick={handleLogin}
        variant="contained"
        size="small"
        style={{ width: "100px" }}
      >
        Submit
      </Button>
      <div>
        No account,
        <span
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => navigate("/signup")}
        >
          Register
        </span>
      </div>
      {noUser && (
        <div className="text-red-700">No user Found, please check email</div>
      )}
      {incorrectCredentials && (
        <div className="text-red-700">Incorrect Credentials</div>
      )}
      <div></div>
    </div>
  );
};

export default Login;
