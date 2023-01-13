import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  user: { result: null, token: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    todoAuth: {
      reducer: (state = initialState, action) => {
        // Google login
        console.log(
          "authSlice -> todoAuth -> action.payload = ",
          action.payload
        );

        Object.assign(state.user, action.payload);
      }, // end of reducer
      prepare: ({ result, token }) => {
        // prepare callback：先处理好payload数据，之后载给reducer处理
        return {
          payload: {
            result: {
              // _id: nanoid(),
              // _type: "user",
              // sub,
              email: result.email,
              name: result.name,
              image: result.picture,
            },

            token,
          },
        };
      }, // end of prepare
    }, // end of todoAuth

    // todoToggled(state, action) {
    //   //   const todo = state.find((todo) => todo.id === action.payload);
    //   //   todo.completed = !todo.completed;
    // },

    todoLogout: (state, action) => initialState,
  },
});

export const { todoAuth, todoLogout } = authSlice.actions;
export const selectUser = (state) => {
  // 获取user最新值
  console.log("authSlice -> selectUser -> state = ", state);
  return state.auth.user;
};
export default authSlice.reducer;
