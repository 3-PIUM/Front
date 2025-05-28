import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product-detail" element={<ProductDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
