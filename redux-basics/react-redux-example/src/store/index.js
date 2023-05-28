import { configureStore, createSlice } from "@reduxjs/toolkit";

const initCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initCounterState,
  reducers: {
    increment(state) {
      //toolkit 사용하면 자동으로 원래 상태를 복제한 새로운 상태 객체를 생성하고 우리가 변경한 상태는 변하지 않도록 오버라이드 함.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const initAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

//configureStore은 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있음.
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
