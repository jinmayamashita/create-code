import { Suspense } from "react";
import Routes from "./routes";

function App() {
  return (
    <Suspense>
      <Routes />
    </Suspense>
  );
}

export default App;
