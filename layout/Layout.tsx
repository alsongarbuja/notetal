import React from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  const toggleTheme = () => {
    const theme = localStorage.getItem("notetal_theme__mode");
    if (theme && theme === "light") {
      localStorage.setItem("notetal_theme__mode", "dark");
    } else {
      localStorage.setItem("notetal_theme__mode", "light");
    }
    document.body.classList.toggle("dark");
  };

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className=" w-4/5 mx-auto">
        <header className="flex justify-between py-10">
          <span>LOGO</span>
          <nav>
            <ul className="flex justify-between">
              <li className="px-2 mr-4 cursor-pointer">Git</li>
              <li className="px-2 mr-4 cursor-pointer">Twitter</li>
              <li className="px-2 mr-4 cursor-pointer">Search</li>
              <li className="px-2 mr-4 cursor-pointer" onClick={toggleTheme}>
                Dark
              </li>
              <li className="px-2 mr-4 cursor-pointer">Login</li>
              <li className="px-2 mr-4 cursor-pointer">Signup</li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
