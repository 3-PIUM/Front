// Layouts
import MenuLayout from "./layout/MenuLayout";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import MyPage from "./pages/MyPage/MyPage";
import Category from "./pages/Category/Category";
import ProductDetail from "./pages/Product/ProductDetail";
import ReviewWritePage from "./pages/Review/ReviewWritePage";
import ScanPage from "./pages/Scan/ScanPage";
import CartPage from "./pages/Cart/CartPage";
import QRCodePage from "./pages/Purchase/QRCodePage";
import Signup from "./pages/SignUp/Signup";
import AboutYouPage from "./pages/SignUp/AboutYouPage";
import Survey from "./pages/SignUp/SurveyPage";
import Welcome from "./pages/SignUp/Welcome";
import PurchaseList from "./pages/Purchase/PurchaseListPage";
import PurchaseDetail from "./pages/Purchase/PurchaseDetailPage";
import Withdraw from "./pages/MyPage/WithdrawPage";
import SettingLanguange from "./pages/MyPage/MypageLanguange";
import IngredientDetail from "./pages/Ingredient/IngredientDetailPage";
import ChatbotPage from "./pages/Chatbot/Chatbotpage";
import MypagePersonalColor from "./pages/MypagePersonalColor";
import MypageSkinType from "./pages/MypageSkinType";
import MypageSkinConcern from "./pages/MypageSkinConcern";
import MbtiTest from "./pages/SkinMBTI/MbtiTest";
import MbtiQuestion from "./pages/SkinMBTI/MbtiQuestion";
import CategoryList from "./pages/Category/CategoryList";
import EditProfile from "./pages/MyPage/EditProfile";
import EditPassword from "./pages/MyPage/EditPassword";
import FindPassword from "./pages/FindPassword";
import PostMachinePage from "./pages/Purchase/QRPOSPage";
import PaymentCompletePage from "./pages/Purchase/PaymentCompletePage";

const routes = [
  // DefaultLayout
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/about", element: <AboutYouPage /> },
  { path: "/survey", element: <Survey /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/Withdraw", element: <Withdraw /> },
  { path: "/mypage/language", element: <SettingLanguange /> },
  { path: "/ingredient-detail", element: <IngredientDetail /> },
  { path: "/chatbot", element: <ChatbotPage /> },
  { path: "/pos", element: <PostMachinePage /> },
  { path: "payment-complete", element: <PaymentCompletePage /> },
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
  {
    path: "/mypage/editpassword",
    element: <EditPassword />,
  },

  {
    path: "/mbti",
    element: <MbtiTest />,
  },
  {
    path: "/mbti/question",
    element: <MbtiQuestion />,
  },
  {
    path: "/editprofile",
    element: <EditProfile />,
  },
  {
    path: "/findpassword",
    element: <FindPassword />,
  },
  {
    path: "/category/:categoryName/:subcategoryName",
    element: <CategoryList />,
  },

  //MenuLayout
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
