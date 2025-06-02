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
import Signup from "./pages/Signup";
import AboutYouPage from "./pages/AboutYouPage";
import Survey from "./pages/SurveyPage";
import Welcome from "./pages/Welcome";
import PurchaseList from "./pages/PurchaseListPage";
import PurchaseDetail from "./pages/PurchaseDetailPage";
import Withdraw from "./pages/WithdrawPage";
import SettingLanguange from "./pages/MypageLanguange";
import IngredientDetail from "./pages/IngredientDetailPage";
import MypagePersonalColor from "./pages/MypagePersonalColor";
import MypageSkinType from "./pages/MypageSkinType";
import MypageSkinConcern from "./pages/MypageSkinConcern";

const routes = [
  // DefaultLayout
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/about", element: <AboutYouPage /> },
  { path: "/survey", element: <Survey /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/Withdraw", element: <Withdraw /> },
  { path: "/settings/language", element: <SettingLanguange /> },
  { path: "/ingredient-detail", element: <IngredientDetail /> },
  {
    path: "/mypage/personalcolor",
    element: <MypagePersonalColor />,
  },
  {
    path: "/mypage/skintype",
    element: <MypageSkinType />,
  },
  {
    path: "/mypage/skinconcern",
    element: <MypageSkinConcern />,
  },

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
      { path: "purchase-list", element: <PurchaseList /> },
      { path: "purchase-detail", element: <PurchaseDetail /> },
    ],
  },
];

export default routes;
