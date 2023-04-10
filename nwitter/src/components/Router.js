import React from "react";
import { Routes, Route } from "react-router-dom";
/* import { HashRouter as Router, Route, Switch } from "react-router-dom"; -> until v5*/
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
/* 
  BrowserRouter vs HashRouter
  1. BrowserRouter
  - HTML5의 history API를 활용한 업데이트
  - 동적인 페이지에 적합
  - 페이지 유무를 서버에 알려줘야 하며, 서버 세팅 시 검색엔진에 신경써야 함.
  - pages 배포 복잡
  2. HashRouter
  - URL의 hash를 활용
  - 주소에 #가 붙어 검색 엔진으로 읽지 못한다(서버가 못 읽어서 페이지 유무를 알 수 없기 때문)
  - 정적인 페이지에 적합
  - pages 배포 간편
  - * 거의 사용하지 않는다 -> 실제 프로젝트에서는 그냥 BrowserRouter 사용하자 (구버전)
*/

/*
  <Switch> : 첫번째로 매칭되는 path를 가진 컴포넌트만 렌더링시킴.
  -> <Route component={PageNotFound} />와 같이 '/' path가 없는, 즉 에러가 났을 때의 경우에 해당 경우만 정확히 렌더링할 수 있다.
  ** react-router-dom v6에서 Routes로 바뀜!!
*/
const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
