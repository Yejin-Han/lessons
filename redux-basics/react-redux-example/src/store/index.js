import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "store/counter";
import authReducer from "store/auth";

//configureStore은 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있음.
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
