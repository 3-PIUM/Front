import { useLocation, useRoutes } from "react-router-dom";
import routes from "./Routes";
import { LanguageProvider } from "./context/LanguageContext"; // ✅ 추가

const App = () => {
  const location = useLocation();
  const content = useRoutes(routes);

  return (
    <LanguageProvider>
      {" "}
      <div key={location.key}>{content}</div>
    </LanguageProvider>
  );
};

export default App;
