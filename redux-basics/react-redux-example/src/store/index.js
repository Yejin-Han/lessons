import { legacy_createStore as createStore } from "redux"; //import { createStore } from "redux" -> redux toolkit을 쓰도록 권유;

// Counter에서 type 오타나면 인식 못하므로 아예 상수로 만듦
export const INCREMENT = "increment";

const initState = { counter: 0, showCounter: true };

const counterReducer = (state = initState, action) => {
  // reducer에서 반환하는 객체는 기존 state와 병합되지 않고 기존 state를 덮어쓴다.
  // 기존 state는 절대 변경해서는 안 되며 새로운 state snopshot을 반환하여 재정의해야 함.

  switch (action.type) {
    case "increment":
      return {
        counter: state.counter + 1,
        showCounter: state.showCounter,
      };
    case "increase":
      return {
        counter: state.counter + action.amount, //extra payload 'amount'
        showCounter: state.showCounter,
      };
    case "decrement":
      return {
        counter: state.counter - 1,
        showCounter: state.showCounter,
      };
    case "toggle":
      return {
        counter: state.counter,
        showCounter: !state.showCounter,
      };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
