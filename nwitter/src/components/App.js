import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  // firebase에 의해 프로그램이 초기화되었는가(바로 초기화되는 것이 아니라 일정 시간을 두고 초기화되므로 초반에 로그인이 안된 것처럼 보일 수 있으므로 필요함.)
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 사용자의 로그인 상태 변경에 대한 관찰자를 추가합니다.
    onAuthStateChanged(authService, (user) => {
      user ? setUserObj(user) : setUserObj(null);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;