import { useState, useEffect, useCallback, ReactElement } from "react";

function useDarkMode(matchMedia: MediaQueryList) {
  const [isDarkMode, setIsDarkMode] = useState(() => matchMedia.matches);

  const handleColorScheme = useCallback(
    (event: MediaQueryListEvent) => setIsDarkMode(event.matches),
    []
  );

  useEffect(() => {
    isDarkMode
      ? document.body.classList.add("dark-scheme")
      : document.body.classList.remove("dark-scheme");
  }, [isDarkMode]);

  useEffect(() => {
    matchMedia.addEventListener("change", handleColorScheme);
    return () => matchMedia.removeEventListener("change", handleColorScheme);
  }, []);

  return [isDarkMode, useCallback(() => setIsDarkMode((s) => !s), [])] as const;
}

type ToggleLogoButtonProps = {
  toggle: () => void;
};
function ToggleLogoButton({ toggle }: ToggleLogoButtonProps) {
  return (
    <div>
      <img src="logo.svg" role="button" onClick={toggle} alt="" />
    </div>
  );
}

type LayoutWrapperProps = {
  children: (ctx: { toggle: () => void }) => ReactElement;
};
function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [_, toggle] = useDarkMode(
    window.matchMedia("(prefers-color-scheme: dark)")
  );

  return <div className="centered">{children({ toggle })}</div>;
}

export function ThemeToggle() {
  return (
    <LayoutWrapper>
      {({ toggle }) => (
        <>
          <ToggleLogoButton toggle={toggle} />
          <h1>React</h1>
          <p>Click the icon to switch between light and dark mode</p>
        </>
      )}
    </LayoutWrapper>
  );
}
