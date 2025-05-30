// App.tsx
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./Routes";

const App = () => {
  const location = useLocation();
  const content = useRoutes(routes);

  return <div key={location.key}>{content}</div>;
};

export default App;
