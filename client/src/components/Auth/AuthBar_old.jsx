import React from "react";
import { Link } from "react-router-dom";
import { Toolbar, Avatar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, todoLogout } from "../../reducers/authSlice";

const AuthBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log("AuthBar -> user:", user);
  //   console.log("Object.keys(user).length = ", Object.keys(user).length);

  const handleLogout = () => {
    try {
      dispatch(todoLogout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Toolbar>
      {user.userName ? (
        <div>
          <Avatar alt={user.userName} src={user.image}>
            {user.userName}
          </Avatar>
          <Typography variant="h6">{user.userName}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button component={Link} to="/auth" color="primary">
          Sign Up
        </Button>
      )}
    </Toolbar>
  );
};

export default AuthBar;
