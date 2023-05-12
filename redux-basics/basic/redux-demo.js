const redux = require("redux");

// Reducer 함수
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

// 저장소
const store = redux.createStore(counterReducer);

// 저장소를 구독할 컴포넌트
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);
/* 직접 실행하지 않고 가리키기만 하는 것은 리덕스가 이를 실행해줄 것이기 때문 */

// 액션
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
