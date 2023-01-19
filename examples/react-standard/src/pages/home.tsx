import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

function PageNavigation() {
  return (
    <nav
      style={{
        position: "fixed",
        display: "flex",
        width: 300,
        justifyContent: "space-around",
      }}
    >
      <Link to="/toggle">Toggle example</Link>
      <Link to="password">Password example</Link>
    </nav>
  );
}

export default function Home() {
  return (
    <>
      <PageNavigation />
      <ThemeToggle />
    </>
  );
}
