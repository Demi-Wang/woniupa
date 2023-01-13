import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LockPersonOutlined from "@mui/icons-material/LockPersonOutlined";
import { blue } from "@mui/material/colors";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { todoAuth } from "../../reducers/authSlice.js";
import Input from "./Input";

import "../../css/auth.css";
import { signup, signin } from "../../actions/auth";

const initialInputs = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [inputs, setInputs] = useState(initialInputs);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowConfirmedPassword = () => {
    setShowConfirmedPassword(
      (prevShowConfirmedPassword) => !prevShowConfirmedPassword
    );
  };

  const handleChange = (prop) => (e) => {
    console.log(`${prop} changed`);

    setInputs((prevInputs) => ({
      ...prevInputs,
      [prop]: e.target.value, // e.target.name = prop
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inputs: ", inputs);

    if (isSignup) {
      dispatch(signup(inputs, navigate));
    } else {
      // sign in
      dispatch(signin(inputs, navigate));
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
    handleShowConfirmedPassword(false);
  };

  const googleSuccess = (res) => {
    // const {sub, name, email, picture}  = jwt_decode(res?.credential)
    // const result = {
    //    sub
    //    name
    //    email
    //    picture
    // };

    const token = res?.credential;
    const result = jwt_decode(token);
    console.log("Auth -> google token: ", jwt_decode(token));
    try {
      // { name, email, picture }
      dispatch(todoAuth({ result, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Sign In was unsuccessful.");
    console.log(error);
  };

  return (
    <Box
      p={2}
      minHeight="95vh"
      sx={{ overflowY: "auto", height: "95vh", flex: 2 }}
    >
      <Stack direction={{ xs: "column", md: "row" }}>
        <Container maxWidth="xs">
          <Paper className="paper" elevation={3}>
            <Avatar
              className="avatar"
              variant="rounded"
              sx={{ bgcolor: blue[500] }}
            >
              <LockPersonOutlined />
            </Avatar>
            <Typography variant="h5" mb={5}>
              {isSignup ? "Sign Up" : "Sign In"}
            </Typography>
            <form className="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input
                      name="firstName"
                      value={inputs.firstName}
                      type="text"
                      label={"First Name"}
                      autoFocus
                      half
                      handleChange={handleChange("firstName")}
                    />
                    <Input
                      name="lastName"
                      value={inputs.lastName}
                      type="text"
                      label={"Last Name"}
                      half
                      handleChange={handleChange("lastName")}
                    />
                  </>
                )}
                <Input
                  name="email"
                  value={inputs.email}
                  type="email"
                  label={"Email"}
                  handleChange={handleChange("email")}
                />
                <Input
                  name="password"
                  value={inputs.password}
                  type={showPassword ? "text" : "password"}
                  label={"Password"}
                  handleChange={handleChange("password")}
                  handleShowPassword={handleShowPassword}
                />
                {isSignup && (
                  <Input
                    name="confirmedPassword"
                    value={inputs.confirmedPassword}
                    type={showConfirmedPassword ? "text" : "password"}
                    label={"Repeat Password"}
                    handleChange={handleChange("confirmedPassword")}
                    handleShowConfirmedPassword={handleShowConfirmedPassword}
                  />
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2 }}
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                  />
                  <Button
                    endIcon={isSignup ? <LoginIcon /> : <AppRegistrationIcon />}
                    variant="text"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={switchMode}
                  >
                    {isSignup
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Stack>
    </Box>
  );
};

export default Auth;
