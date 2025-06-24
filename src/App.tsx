import { useLocation, useRoutes } from "react-router-dom";
import routes from "./Routes";
import { LanguageProvider } from "./context/LanguageContext";
import { Suspense } from "react";
import Loading from "./pages/Loading";

const App = () => {
  const location = useLocation();
  const content = useRoutes(routes);

  return (
    <LanguageProvider>
      <Suspense fallback={<Loading />}>
        <div key={location.key}>{content}</div>
      </Suspense>
    </LanguageProvider>
  );
};

export default App;
