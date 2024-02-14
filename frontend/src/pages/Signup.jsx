import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [dataMissing, setDataMissing] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(userData.username);
  }, [userData.username]);

  const navigate = useNavigate();

  const checkPasswords = () => {
    if (userData.password === userData.confirmPassword) return true;
    else return false;
  };

  const handleUserSignupData = async () => {
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !checkPasswords()
    ) {
      setDataMissing(true);
      return;
    }

    const data = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
    await axios.post("http://localhost:3001/user/signup", data).then((res) => {
      console.log(res.status);
      if (res.status === 201) {
        enqueueSnackbar("User Successfully Added", { variant: "success" });
        navigate("/login");
      }
    });
  };
  return (
    <div className="flex flex-col gap-y-6 items-center m-[100px]">
      <div className="text-[20px] font-bold">Register</div>
      <div className="flex gap-x-2">
        <label htmlFor="">Name</label>
        <div className="">
          <input
            style={{ border: "1px solid blue" }}
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        <label htmlFor="">Email</label>
        <div className="">
          <input
            style={{ border: "1px solid blue" }}
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        <label htmlFor="">Password</label>
        <div>
          <input
            style={{ border: "1px solid blue" }}
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        <label htmlFor="">Re enter password</label>
        <div className="">
          <input
            style={{ border: "1px solid blue" }}
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <Button variant="contained" onClick={handleUserSignupData}>
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
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
      {dataMissing && (
        <div style={{ color: "red" }}>Data Missing/Password doesn't match</div>
      )}
    </div>
  );
};

export default Signup;
