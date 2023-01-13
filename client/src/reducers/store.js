import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // user 是传入 persistReducer 中的 reducer 管理的状态
  // blacklist: [""], // 黑名单： 除了指定的state外，其他都做持久化的state
};

const persistedAuthReducer = persistReducer(userPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
