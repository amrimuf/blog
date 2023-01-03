import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from "next-themes";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from '../styles/styles.module.css'

export default function Header() {
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  const navPaths =['', 'blog', 'projects', 'about']

  return (
    <header className={`sticky top-0 z-20 py-2 bg-white dark:bg-black ${styles.handDrawnLineBot} `}>
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
          {navPaths.map((navPath, index) => 
                  <Link key={index} href={ `/${navPath}`} className={`  ${
                    router.asPath.split('/')[1] === `${navPath}`
                    ? "text-neutral-900 dark:text-neutral-100 font-bold"
                    : ""
                  }`}>
                    <span className='capitalize'>{navPath === '' ? 'Home' : navPath}</span>{" "}
                  {router.asPath.split('/')[1] === `${navPath}` && (
                    <i className="bi bi-arrow-down inline-block h-3 w-3 text-lime-500" style={{ fontSize: 14, WebkitTextStroke:1}}></i>
                  )}
              </Link>
          )}
        </div>
        <div className='md:hidden flex space-x-4'>
        <Link href="/">Home</Link>
          <div 
            className="HAMBURGER-ICON space-y-2 my-auto"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
          </div>
        </div>

        <div className={navOpen && theme==="dark" ? 'block absolute h-screen w-full top-0 left-0 bg-black z-10 flex flex-col items-center place-content-evenly' : navOpen && theme==="light" ? 'block absolute h-screen w-full top-0 left-0 bg-white z-10 flex flex-col items-center place-content-evenly' : 'hidden'}>
          <div
            className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
            onClick={() => setNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-neutral-600"
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
            <li className="border-b-2 border-lime-500 my-8 uppercase">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="border-b-2 border-lime-400 my-8 uppercase">
              <Link href="/projects">Projects</Link>
            </li>
            <li className="border-b-2 border-lime-400 my-8 uppercase">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
};