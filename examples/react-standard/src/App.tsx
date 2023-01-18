import { Suspense } from "react";
import { AppProviders } from "./context";
import Routes from "./routes";

function App() {
  return (
    <Suspense>
      <AppProviders>
        <Routes />
      </AppProviders>
    </Suspense>
  );
}

export default App;
