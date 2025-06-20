import { useLocation, useRoutes } from "react-router-dom";
import routes from "./Routes";
import { LanguageProvider } from "./context/LanguageContext";
import { Suspense } from "react";

const App = () => {
  const location = useLocation();
  const content = useRoutes(routes);

  return (
    <LanguageProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div key={location.key}>{content}</div>
      </Suspense>
    </LanguageProvider>
  );
};

export default App;
