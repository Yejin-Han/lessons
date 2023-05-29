import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet /> {/* children 라우트를 렌더링할 장소의 마커 */}
      </main>
    </>
  );
};

export default RootLayout;
