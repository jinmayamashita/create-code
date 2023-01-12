import { AppProviders } from "./context";
import { Routes } from "./routes";

export default function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
}
