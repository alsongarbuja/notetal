import Link from "next/link";
import React, { useState } from "react";
import { GitHub, Instagram, Linkedin, Menu, Moon, Search, Twitter, X } from "react-feather";

const Layout = ({ children }: { children: JSX.Element }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleTheme = () => {
    const theme = localStorage.getItem("notetal_theme__mode");
    if (theme && theme === "light") {
      localStorage.setItem("notetal_theme__mode", "dark");
    } else {
      localStorage.setItem("notetal_theme__mode", "light");
    }
    document.body.classList.toggle("dark");
  };

  const openNavMenu = () => setIsNavOpen(prev => !prev)

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className=" w-4/5 mx-auto">
        <header className="flex justify-between items-center py-10">
          <span>LOGO</span>
          <Menu className="block md:hidden cursor-pointer" onClick={openNavMenu} />
          <nav className={
            `fixed w-full h-screen ${isNavOpen?'top-0':'-top-full'} left-0 z-10 py-10 
              md:relative md:w-fit md:h-fit md:p-0 
              bg-white dark:bg-gray-800
              transition-top duration-500
            `
          }>
            <X className="fixed z-20 right-12 cursor-pointer md:hidden" onClick={openNavMenu} />
            <ul className="h-full flex justify-between items-center flex-col md:flex-row gap-4">
              <li className="px-2 mr-4 cursor-pointer flex"><GitHub /><span className="ml-2 block md:hidden">Github</span></li>
              <li className="px-2 mr-4 cursor-pointer flex"><Twitter /><span className="ml-2 block md:hidden">Twitter</span></li>
              <li className="px-2 mr-4 cursor-pointer flex"><Search /><span className="ml-2 block md:hidden">Search</span></li>
              <li className="px-2 mr-4 cursor-pointer flex" onClick={toggleTheme}>
                <Moon /><span className="ml-2 block md:hidden">Dark mode</span>
              </li>
              <Link href="/auth/login">
                <li className="mr-4 cursor-pointer border border-indigo-400 py-2 px-4">
                  Login
                </li>
              </Link>
              <li className="mr-4 cursor-pointer bg-indigo-400 text-white py-2 px-4">
                Signup
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="flex justify-between items-center py-10 w-full">
          <span>
            &copy; notetal, 2022
          </span>
          <div className="flex justify-between items-center">
            <a href="mailto:magar33alson@gmail.com" className="bg-indigo-400 text-white py-3 px-6 mr-4 rounded-full">
              Contact Us
            </a>
            <ul className="flex gap-3 justify-evenly">  
              <li><Linkedin className="text-cyan-800 cursor-pointer" /></li>
              <li><Instagram className="text-red-400 cursor-pointer" /></li>
              <li><Twitter className="text-blue-400 cursor-pointer" /></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
