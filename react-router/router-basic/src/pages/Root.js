import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet /> {/* children 라우트를 렌더링할 장소의 마커 */}
      </main>
    </>
  );
};

export default RootLayout;
