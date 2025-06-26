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
