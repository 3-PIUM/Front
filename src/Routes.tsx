// Layouts
// import MenuLayout from "./layout/MenuLayout";

// Pages
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import WishList from "./pages/WishList";
// import MyPage from "./pages/MyPage/MyPage";
// import Category from "./pages/Category/Category";
// import ProductDetail from "./pages/Product/ProductDetail";
// import ReviewWritePage from "./pages/Review/ReviewWritePage";
// import ScanPage from "./pages/Scan/ScanPage";
// import CartPage from "./pages/Cart/CartPage";
// import QRCodePage from "./pages/Purchase/QRCodePage";
// import Signup from "./pages/SignUp/Signup";
// import AboutYouPage from "./pages/SignUp/AboutYouPage";
// import Survey from "./pages/SignUp/SurveyPage";
// import Welcome from "./pages/SignUp/Welcome";
// import PurchaseList from "./pages/Purchase/PurchaseListPage";
// import PurchaseDetail from "./pages/Purchase/PurchaseDetailPage";
// import Withdraw from "./pages/MyPage/WithdrawPage";
// import SettingLanguange from "./pages/MyPage/MypageLanguange";
// import IngredientDetail from "./pages/Ingredient/IngredientDetailPage";
// import ChatbotPage from "./pages/Chatbot/Chatbotpage";
// import MypagePersonalColor from "./pages/MyPage/MypagePersonalColor";
// import MypageSkinType from "./pages/MyPage/MypageSkinType";
// import MypageSkinConcern from "./pages/MyPage/MypageSkinConcern";
// import MbtiTest from "./pages/SkinMBTI/MbtiTest";
// import MbtiQuestion from "./pages/SkinMBTI/MbtiQuestion";
// import CategoryList from "./pages/Category/CategoryList";
// import EditProfile from "./pages/MyPage/EditProfile";
// import EditPassword from "./pages/MyPage/EditPassword";
// import FindPassword from "./pages/FindPassword";
// import PostMachinePage from "./pages/Purchase/QRPOSPage";
// import PaymentCompletePage from "./pages/Purchase/PaymentCompletePage";
// import SkinTest from "./pages/SignUp/SkinTest";
// import SkinTypeResult from "./pages/SignUp/SkinTypeResult";
// import MbtiResult from "./pages/SkinMBTI/MbtiResult";
// import PersonalTest from "./pages/SignUp/PersonalTest";
// import PersonalColorResult from "./pages/SignUp/PersonalColorResult";
import { lazy } from "react";
import Loading from "./pages/Loading";
import SearchResult from "./pages/Product/SearchResult";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp/Signup"));
const AboutYouPage = lazy(() => import("./pages/SignUp/AboutYouPage"));
const Survey = lazy(() => import("./pages/SignUp/SurveyPage"));
const Welcome = lazy(() => import("./pages/SignUp/Welcome"));
const Withdraw = lazy(() => import("./pages/MyPage/WithdrawPage"));
const SettingLanguange = lazy(() => import("./pages/MyPage/MypageLanguange"));
const IngredientDetail = lazy(
  () => import("./pages/Ingredient/IngredientDetailPage")
);
const ChatbotPage = lazy(() => import("./pages/Chatbot/Chatbotpage"));
const MypagePersonalColor = lazy(
  () => import("./pages/MyPage/MypagePersonalColor")
);
const MypageSkinType = lazy(() => import("./pages/MyPage/MypageSkinType"));
const MypageSkinConcern = lazy(
  () => import("./pages/MyPage/MypageSkinConcern")
);
const MbtiTest = lazy(() => import("./pages/SkinMBTI/MbtiTest"));
const MbtiQuestion = lazy(() => import("./pages/SkinMBTI/MbtiQuestion"));
const MbtiResult = lazy(() => import("./pages/SkinMBTI/MbtiResult"));
const SkinTest = lazy(() => import("./pages/SignUp/SkinTest"));
const SkinTypeResult = lazy(() => import("./pages/SignUp/SkinTypeResult"));
const PersonalTest = lazy(() => import("./pages/SignUp/PersonalTest"));
const PersonalColorResult = lazy(
  () => import("./pages/SignUp/PersonalColorResult")
);
const CategoryList = lazy(() => import("./pages/Category/CategoryList"));
const EditProfile = lazy(() => import("./pages/MyPage/EditProfile"));
const EditPassword = lazy(() => import("./pages/MyPage/EditPassword"));
const FindPassword = lazy(() => import("./pages/FindPassword"));
const PostMachinePage = lazy(() => import("./pages/Purchase/QRPOSPage"));
const PurchaseDetail = lazy(
  () => import("./pages/Purchase/PurchaseDetailPage")
);
const PurchaseList = lazy(() => import("./pages/Purchase/PurchaseListPage"));

const PaymentCompletePage = lazy(
  () => import("./pages/Purchase/PaymentCompletePage")
);

const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const QRCodePage = lazy(() => import("./pages/Purchase/QRCodePage"));

const MenuLayout = lazy(() => import("./layout/MenuLayout"));
const Home = lazy(() => import("./pages/Home"));
const WishList = lazy(() => import("./pages/WishList"));
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
const Category = lazy(() => import("./pages/Category/Category"));
const ProductDetail = lazy(() => import("./pages/Product/ProductDetail"));
const ReviewWritePage = lazy(() => import("./pages/Review/ReviewWritePage"));
const ScanPage = lazy(() => import("./pages/Scan/ScanPage"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));

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
  { path: "/cart/pay/:memberId", element: <PostMachinePage /> },
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
    path: "/mbti/result",
    element: <MbtiResult />,
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
    path: "/:topClicked/:categoryName/:subcategoryName",
    element: <CategoryList />,
  },
  {
    path: "/skintest",
    element: <SkinTest />,
  },
  {
    path: "/skin-result",
    element: <SkinTypeResult />,
  },
  {
    path: "/personal-test",
    element: <PersonalTest />,
  },
  {
    path: "/personal-result",
    element: <PersonalColorResult />,
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
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
      { path: "search/:keyword", element: <SearchResult /> },
    ],
  },
];

export default routes;
