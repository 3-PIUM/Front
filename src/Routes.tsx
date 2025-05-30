// Layouts
import MenuLayout from "./layout/MenuLayout";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import MyPage from "./pages/MyPage";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import ReviewWritePage from "./pages/ReviewWritePage";
import ScanPage from "./pages/ScanPage";
import CartPage from "./pages/CartPage";
import QRCodePage from "./pages/QRCodePage";

const routes = [
  // DefaultLayout
  { path: "/", element: <Login /> },

  // MenuLayout
  {
    path: "/",
    element: <MenuLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "wishlist", element: <WishList /> },
      { path: "mypage", element: <MyPage /> },
      { path: "category", element: <Category /> },
      { path: "product-detail", element: <ProductDetail /> },
      { path: "review-write", element: <ReviewWritePage /> },
      { path: "scan", element: <ScanPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "qr", element: <QRCodePage /> },
    ],
  },
];

export default routes;
