import { useLocation, useRoutes } from "react-router-dom";
import routes from "./Routes";
import { LanguageProvider } from "./context/LanguageContext";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import { WishlistProvider } from "./context/WishlistContext";

const App = () => {
  const location = useLocation();
  const content = useRoutes(routes);

  return (
    <LanguageProvider>
      <WishlistProvider>
        <Suspense fallback={<Loading />}>
          <div key={location.key}>{content}</div>
        </Suspense>
      </WishlistProvider>
    </LanguageProvider>
  );
};

export default App;
