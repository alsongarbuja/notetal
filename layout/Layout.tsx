import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  GitHub,
  Instagram,
  Linkedin,
  Menu,
  Moon,
  Search,
  Sun,
  Twitter,
  X,
} from "react-feather";
import Image from "next/image";

const Layout = ({ children }: { children: JSX.Element }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigator = useRouter();
  const [theme, setTheme] = useState<string | null>("light");
  const [profileDrop, setProfileDrop] = useState(false);

  const toggleTheme = () => {
    if (theme && theme === "light") {
      localStorage.setItem("notetal_theme__mode", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("notetal_theme__mode", "light");
      setTheme("light");
    }
    document.body.classList.toggle("dark");
  };

  const openNavMenu = () => setIsNavOpen((prev) => !prev);

  const navigate = (route: string) => {
    openNavMenu();
    navigator.push(`/auth/${route}`);
  };

  useEffect(() => setTheme(localStorage.getItem("notetal_theme__mode")), []);

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="w-4/5 mx-auto">
        <header className="flex justify-between items-center py-10">
          <Link href="/">LOGO</Link>
          <Menu
            className="block md:hidden cursor-pointer"
            onClick={openNavMenu}
          />
          <nav
            className={`fixed w-full h-screen ${
              isNavOpen ? "top-0" : "-top-full"
            } left-0 z-10 py-10 
              md:relative md:w-fit md:h-fit md:p-0 
              bg-white dark:bg-gray-800
              transition-top duration-500
            `}
          >
            <X
              className="fixed z-20 right-12 cursor-pointer md:hidden"
              onClick={openNavMenu}
            />
            <ul className="h-full flex justify-between items-center flex-col md:flex-row gap-4">
              <li className="px-2 mr-4 cursor-pointer">
                <a href="https://github.com/alsongarbuja/notetal" className="flex">
                  <GitHub />
                  <span className="ml-2 block md:hidden">Github</span>
                </a>
              </li>
              <li className="px-2 mr-4 cursor-pointer">
                <a href="https://twitter.com/alsongarbuja" className="flex">
                  <Twitter />
                  <span className="ml-2 block md:hidden">Twitter</span>
                </a>
              </li>
              <li className="px-2 mr-4 cursor-pointer flex">
                <Search />
                <span className="ml-2 block md:hidden">Search</span>
              </li>
              <li
                className="px-2 mr-4 cursor-pointer flex"
                onClick={toggleTheme}
              >
                {theme === "light" ? <Moon /> : <Sun />}
                <span className="ml-2 block md:hidden">
                  {theme === "light" ? "Dark" : "Light"} mode
                </span>
              </li>
              {false ? (
                <div className="w-8 h-8 relative">
                  <Image
                    src="https://www.mountsinai.on.ca/wellbeing/our-team/team-images/person-placeholder/image"
                    className="rounded-full cursor-pointer"
                    width="50"
                    height="50"
                    onClick={()=>setProfileDrop(prev => !prev)}
                  />
                  <div
                    className={`absolute z-20 bg-white text-black px-2 py-3 ${
                      profileDrop ? "block" : "hidden"
                    }`}
                  >
                    <Link href="/api/auth/logout">Logout</Link>
                  </div>
                  {profileDrop && (
                    <div className="fixed z-10 bg-transparent w-full h-screen top-0 left-0" />
                  )}
                </div>
              ) : (
                <>
                  <Link href="/auth/login">
                    <li className="mr-4 cursor-pointer border border-indigo-400 rounded-full py-2 px-4">
                      Login
                    </li>
                  </Link>
                  <Link href="/auth/register">
                    <li className="mr-4 cursor-pointer bg-indigo-400 text-white rounded-full py-2 px-6">
                      Signup
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="flex justify-between items-center flex-col-reverse gap-3 md:flex-row py-10 w-full">
          <span>&copy; notetal, 2022</span>
          <div className="flex justify-between items-center">
            <a
              href="mailto:magar33alson@gmail.com"
              className="bg-indigo-400 text-white py-3 px-6 mr-4 rounded-full"
            >
              Contact Us
            </a>
            <ul className="flex gap-3 justify-evenly">
              <a href="https://linkedin.com/in/alsongarbuja">
                <Linkedin className="text-cyan-800 cursor-pointer" />
              </a>
              <a href="https://instagram.com/alsongarbuja">
                <Instagram className="text-red-400 cursor-pointer" />
              </a>
              <a href="http://twitter.com/alsongarbuja">
                <Twitter className="text-blue-400 cursor-pointer" />
              </a>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
