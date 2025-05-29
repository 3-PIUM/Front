import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ReviewWritePage from "./pages/ReviewWritePage";
import ScanPage from "./pages/ScanPage";
import CartPage from "./pages/ CartPage";
import QRCodePage from "./pages/QRCodePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/review-write" element={<ReviewWritePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/qr" element={<QRCodePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
