import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserEmail, setUserId, setUserName } from "../redux/userReducer";
import NavbarChangePassword from "../components/NavbarChangePassword";

const ChangePassword = () => {
  const [changePassword, setChangePassword] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [missingData, setMissingData] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userData.userId);
  const userEmail = useSelector((state) => state.userData.userEmail);
  const userName = useSelector((state) => state.userData.userName);

  console.log(userId, userEmail, userName);

  const { enqueueSnackbar } = useSnackbar();

  const passwordValid = () => {
    if (changePassword.newPassword === changePassword.confirmNewPassword) {
      return true;
    } else return false;
  };

  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:3001/user/logout",
      null,
      {
        withCredentials: true,
      }
    );
    console.log(response.status);
    if (response.status === 200) {
      navigate("/login", { replace: true });
      dispatch(setUserId(""));
      dispatch(setUserName(""));
      dispatch(setUserEmail(""));
    }
  };

  const handleChangePassword = async () => {
    if (
      !changePassword.email ||
      !changePassword.currentPassword ||
      !passwordValid()
    ) {
      setMissingData(true);
      return;
    }

    const data = {
      email: changePassword.email,
      oldPassword: changePassword.currentPassword,
      newPassword: changePassword.newPassword,
    };

    const res = await axios.patch(
      `http://localhost:3001/user/change_password/${userId},`,
      data
    );
    if (res.status === 200) {
      enqueueSnackbar("Password Changed Successfully, Login Again.", {
        variant: "success",
      });
      handleLogout();
    }
  };

  const handleOnChangeEmail = (e) => {
    setMissingData(false);
    setChangePassword((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleOnChangeCurrentPassword = (e) => {
    setMissingData(false);
    setChangePassword((prev) => ({
      ...prev,
      currentPassword: e.target.value,
    }));
  };

  const handleOnChangeNewPassword = (e) => {
    setMissingData(false);

    setChangePassword((prev) => ({
      ...prev,
      newPassword: e.target.value,
    }));
  };

  const handleOnChangeReEnterNewPassword = (e) => {
    setMissingData(false);
    setChangePassword((prev) => ({
      ...prev,
      confirmNewPassword: e.target.value,
    }));
  };

  return (
    <div>
      <NavbarChangePassword />
      <div className="flex flex-col justify-center items-center gap-y-4">
        Hi,{userName} change your password
        <div>
          <label htmlFor="">Email :</label>
          <div className="border-2 border-blue-700 ">
            <input type="text" onChange={(e) => handleOnChangeEmail(e)} />
          </div>
        </div>
        <div>
          <label htmlFor="">Enter Current Password :</label>
          <div className="border-2 border-blue-700 ">
            <input
              type="text"
              onChange={(e) => handleOnChangeCurrentPassword(e)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Enter New Password :</label>
          <div className="border-2 border-blue-700 ">
            <input type="text" onChange={(e) => handleOnChangeNewPassword(e)} />
          </div>
        </div>
        <div>
          <label htmlFor="">Re enter Password :</label>
          <div className="border-2 border-blue-700 ">
            <input
              type="text"
              onChange={(e) => handleOnChangeReEnterNewPassword(e)}
            />
          </div>
        </div>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleChangePassword()}
        >
          Submit
        </Button>
        {missingData && (
          <div className="text-red-700">
            Email,Current Password Missing / New Passwords doesen't match{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
