import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
