import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  // temporary solution to show wich section we are right now
  const sectionName = pathname.split("/").filter(Boolean)[0];
  const name = sectionName;
  const [theme, setTheme] = useLocalStorage("theme", "light");
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <header
      className={`h-12 py-2 px-5 flex items-center justify-between z-20 fixed left-55 max-sm:left-0 xl:left-60 top-0 right-0 bg-(--color-bg-secondary)/60 backdrop-blur-md`}
    >
      <h1 className="section-header capitalize">{name || "overview"}</h1>
      <div>
        {theme === "dark" ? (
          <Sun
            onClick={() => setTheme("light")}
            className="cursor-pointer text-white hover:drop-shadow hover:animate-none  hover:drop-shadow-white "
          />
        ) : (
          <Moon
            onClick={() => setTheme("dark")}
            className="cursor-pointer drop-shadow hover:drop-shadow-black/20 hover:dark:text-white"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
