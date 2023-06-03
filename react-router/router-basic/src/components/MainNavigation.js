import { NavLink } from "react-router-dom"; //현재 활성인 라우트의 경로가 NavLink의 경로로 시작하는지 확인하여 활성일 때만 링크에 스타일링할 수 있음

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
            {/* Link 컴포넌트는 앵커요소(a)를 렌더링 함 */}
            {/* isActive(boolean) 프로퍼티가 있는 객체는 router-dom이 제공, 현재 활성인 라우트로 인도되었으면 true, 아니면 false */}
            {/* end(boolean) 프로퍼티 역시 router-dom이 제공, 현재 활성인 라우트의 url 경로가 해당 경로로 끝나면 이 링크만 활성으로 간주 */}
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
