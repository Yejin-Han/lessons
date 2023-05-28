import { createSlice } from "@reduxjs/toolkit";

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

export const counterActions = counterSlice.actions;

export default counterSlice.reducer; //slice 전체 말고 reducer만 export 한다.
