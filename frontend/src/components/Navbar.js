import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserEmail, setUserId, setUserName } from "../redux/userReducer";
import Logout from "./Logout";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userData.userName);
  console.log(userName);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3001/user/logout");
      if (res.status === 200) {
        navigate("/login");
        dispatch(setUserId(""));
        dispatch(setUserName(""));
        dispatch(setUserEmail(""));
      }
    } catch (err) {
      console.log(err.response.status);
    }
  };

  const handleChangePasssword = async () => {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <div>Username: {userName && userName}</div>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit" onClick={() => navigate("/changePassword")}>
            Change Password
          </Button>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
