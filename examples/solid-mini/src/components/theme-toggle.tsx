import { createEffect, createSignal, onCleanup } from "solid-js";

export default function ThemeToggle() {
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

  const [isDarkMode, setIsDarkMode] = createSignal(matchMedia.matches);

  createEffect(() => {
    isDarkMode()
      ? document.body.classList.add("dark-scheme")
      : document.body.classList.remove("dark-scheme");
  });

  createEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    matchMedia.addEventListener("change", handleChange);
    onCleanup(() => matchMedia.removeEventListener("change", handleChange));
  });

  const toggle = () => setIsDarkMode((s) => !s);

  return (
    <div class="centered">
      <div>
        <img src="logo.svg" role="button" onClick={toggle} alt="" />
      </div>
      <h1>Solid</h1>
      <p>Click the icon to switch between light and dark mode</p>
    </div>
  );
}
