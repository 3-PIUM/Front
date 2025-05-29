import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ReviewWritePage from "./pages/ReviewWritePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/review-write" element={<ReviewWritePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
