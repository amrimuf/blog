import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from "next-themes";
import 'bootstrap-icons/font/bootstrap-icons.css';

// import { SITE_NAME } from '../utils/constants';

export default function Header() {
  const router = useRouter();
  console.log(router.asPath);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-20 py-2 bg-white dark:bg-black">
      <div className="container max-w-4xl mx-auto flex items-center justify-between px-4 lg:px-0">
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 rounded focus:outline-none lg:pl-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500 dark:text-yellow-500"
              >
                {theme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
        </button>

        <div className="space-x-8 hidden md:block">
          <Link href="/" className={`text-base  ${
                router.asPath === "/"
                  ? "text-gray-800 font-bold dark:text-gray-400"
                  : "text-gray-600 dark:text-gray-300 font-normal "
              }`}>
                Home{" "}
              {router.asPath === "/" && (
                <i className="bi bi-arrow-down inline-block h-3 w-3" style={{ fontSize: 14 }}></i>
              )}
          </Link>
          <Link href="/blog" className={`text-base  ${
                router.asPath === "/blog"
                  ? "text-gray-800 font-bold dark:text-gray-400"
                  : "text-gray-600 dark:text-gray-300 font-normal "
              }`}>
              Blog{" "}
              {router.asPath === "/blog" && (
                <i className="bi bi-arrow-down inline-block h-3 w-3" style={{ fontSize: 14 }}></i>
              )}
          </Link>
          <Link href="/projects" className={`text-base  ${
                router.asPath === "/projects"
                  ? "text-gray-800 font-bold dark:text-gray-400"
                  : "text-gray-600 dark:text-gray-300 font-normal "
              }`}>
              Projects{" "}
              {router.asPath === "/projects" && (
                <i className="bi bi-arrow-down inline-block h-3 w-3" style={{ fontSize: 14 }}></i>
              )}
          </Link>
          <Link href="/about" className={`text-base  ${
                router.asPath === "/about"
                  ? "text-gray-800 font-bold dark:text-gray-400"
                  : "text-gray-600 dark:text-gray-300 font-normal "
              }`}>
              About{" "}
              {router.asPath === "/about" && (
                <i className="bi bi-arrow-down inline-block h-3 w-3" style={{ fontSize: 14 }}></i>
              )}
          </Link>
        </div>

        <div className='md:hidden flex space-x-4'>
        <Link href="/">Home</Link>
          <div 
            className="HAMBURGER-ICON space-y-2 my-auto"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
          </div>
        </div>

        <div className={isNavOpen && theme==="dark" ? "showMenuNavDark" : isNavOpen && theme==="light"? "showMenuNav" : "hideMenuNav"}>
          <div
            className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
            <li className="border-b border-gray-400 my-8 uppercase">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <Link href="/projects">Projects</Link>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
      .showMenuNavDark {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>

    </header>
  )
};