"use client"

import React, { useEffect, useState } from "react";
import { GitHub, Instagram, Linkedin, Mail, Menu, Moon, Search, Sun, Twitter, X } from "react-feather"
import { NextUIProvider, Button, Avatar, Link } from "@nextui-org/react";

export default function PublicLayout({ children }: {
  children: React.ReactNode
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
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

  useEffect(() => setTheme(localStorage.getItem("notetal_theme__mode")), []);

  return (
    <NextUIProvider>
      <div className="text-black bg-white dark:bg-gray-800 dark:text-white">
        <div className="w-4/5 mx-auto">
          <header className="flex items-center justify-between py-10">
            <Link href="/" color="foreground">LOGO</Link>
            <Menu
              className="block cursor-pointer md:hidden"
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
                className="fixed z-20 cursor-pointer right-12 md:hidden"
                onClick={openNavMenu}
              />
              <ul className="flex flex-col items-center justify-between h-full gap-4 md:flex-row">
                <li className="px-2 mr-4 cursor-pointer">
                  <a href="https://github.com/alsongarbuja/notetal" className="flex">
                    <GitHub />
                    <span className="block ml-2 md:hidden">Github</span>
                  </a>
                </li>
                <li className="px-2 mr-4 cursor-pointer">
                  <a href="https://twitter.com/alsongarbuja" className="flex">
                    <Twitter />
                    <span className="block ml-2 md:hidden">Twitter</span>
                  </a>
                </li>
                <li className="flex px-2 mr-4 cursor-pointer">
                  <Search />
                  <span className="block ml-2 md:hidden">Search</span>
                </li>
                <li
                  className="flex px-2 mr-4 cursor-pointer"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <Moon /> : <Sun />}
                  <span className="block ml-2 md:hidden">
                    {theme === "light" ? "Dark" : "Light"} mode
                  </span>
                </li>
                {false ? (
                  <div className="relative">
                    <Avatar showFallback src='https://images.unsplash.com/broken' className="cursor-pointer" onClick={()=>setProfileDrop(true)} />
                    <div
                      className={`absolute z-20 bg-white text-black px-2 py-3 ${
                        profileDrop ? "block" : "hidden"
                      }`}
                    >
                      <Link href="/api/auth/logout">Logout</Link>
                    </div>
                    {profileDrop && (
                      <div className="fixed top-0 left-0 z-10 w-full h-screen bg-black/50" onClick={()=>setProfileDrop(false)} />
                    )}
                  </div>
                ) : (
                  <>
                    <Button color="primary" radius="full" href="/auth/login" as={Link}>
                      Login
                    </Button>
                    <Button color="primary" radius="full" variant="bordered" href="/auth/register" as={Link}>
                      Signup
                    </Button>
                  </>
                )}
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="flex flex-col-reverse items-center justify-between w-full gap-3 py-10 md:flex-row">
            <span>&copy; notetal, 2022</span>
            <div className="flex items-center justify-between gap-4">
              <Button color="primary" radius="full" endContent={<Mail />} href="mailto:magar33alson@gmail.com" as={Link}>
                Mail US
              </Button>
              <ul className="flex gap-3 justify-evenly">
                <a href="https://linkedin.com/in/alsongarbuja">
                  <Linkedin className="cursor-pointer text-cyan-800" />
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
    </NextUIProvider>
  )
}