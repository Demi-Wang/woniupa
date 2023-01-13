import * as api from "../api/index.js";
import { todoAuth } from "../reducers/authSlice.js";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData); // data格式: { result: { name, email, password }, token: '' }

    dispatch(todoAuth(data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData); // data格式: { result: { name, email, password }, token: '' }

    dispatch(todoAuth(data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
