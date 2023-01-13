import React from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  name,
  value,
  type,
  label,
  half,
  autoFocus,
  handleChange,
  handleShowPassword,
  handleShowConfirmedPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        value={value}
        type={type}
        label={label}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        size="small"
        required
        fullWidth
        autoFocus={autoFocus}
        InputProps={
          // 密码可见/不可见
          name === "password" || name === "confirmedPassword"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="toggle password visibility">
                      <IconButton
                        onClick={
                          name === "password"
                            ? handleShowPassword
                            : handleShowConfirmedPassword
                        }
                      >
                        {type === "password" ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};

export default Input;
