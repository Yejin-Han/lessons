import { useSelector, useDispatch } from "react-redux"; //만약 클래스 컴포넌트를 사용한다면 connect 훅을 import 할 것
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  /* 
  저장소가 관리하는 데이터에 액세스 (리덕스가 관리하는 상태 => 우리가 추출하려는 상태 부분(복잡한 상태 구조 중 일부))
  자동으로 subscription을 설정한다.
  */

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button>Increment</button>
        <button>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
