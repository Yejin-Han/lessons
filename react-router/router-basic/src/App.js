import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);

// createRoutesFromElements를 사용한 경우
/*
const routerDefinitions = createRouterFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);
*/

// *Link는 routerprovider 안에서 렌더링될 경우에만 작동하므로 그냥 편하게 밖에 mainnav를 넣을 수 없다.
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
