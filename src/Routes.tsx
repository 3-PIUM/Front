// Layouts
import MenuLayout from "./layout/MenuLayout";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import MyPage from "./pages/MyPage";
import Category from "./pages/Category";
import Signup from "./pages/Signup";
import QuickInfo from "./pages/QuickInfo";

const routes = [
  //DefaultLayout
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/quickinfo", element: <QuickInfo /> },
  //MenuLayout
  {
    path: "/",
    element: <MenuLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "wishlist", element: <WishList /> },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "category",
        element: <Category />,
      },
    ],
  },
];

export default routes;
