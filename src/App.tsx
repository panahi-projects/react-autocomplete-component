import { StrictMode } from "react";
import AppRouterProvider from "providers/AppRouterProvider";

function App() {
  return (
    <StrictMode>
      <AppRouterProvider />
    </StrictMode>
  );
}

export default App;
