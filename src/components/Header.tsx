import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from "next-themes";
import styles from '@/styles/styles.module.css'
import { BsArrowDown, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { VscChromeClose} from 'react-icons/vsc';

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
            {mounted && 
              (theme === "dark" ?
                  <BsSunFill className='text-xl text-yellow-500'/>
                : 
                  <BsMoonFill className='text-xl text-yellow-500'/>)
            }
        </button>

        <div className="space-x-8 hidden md:flex capitalize">
          {navPaths.map((navPath, index) => 
              <Link key={index} href={ `/${navPath}`} className={router.asPath.split('/')[1] === navPath || router.pathname === `/${navPath}` ? 'font-bold dark:text-neutral-50 text-neutral-900' : 'font-normal'}>
                {navPath !== '' ? navPath : 'home'}
                <BsArrowDown className={`${router.asPath.split('/')[1] === navPath || router.pathname === `/${navPath}` ? 'stroke-[1.5px] inline-block text-base text-lime-500 ml-[3px] rotate-1' : 'hidden'}`}/>
              </Link>           
          )}
        </div>
        <div className='md:hidden flex space-x-4'>
          <Link href="/">Home</Link>
          <div 
            className="space-y-2 my-auto"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
            <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-400"></span>
          </div>
        </div>

        <div className={`fixed inset-y-0 right-0 w-full bg-white dark:bg-black transform transition-transform duration-300 ease-in-out flex flex-col items-center place-content-evenly ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => setNavOpen(false)}
          >
              <VscChromeClose className='text-gray-400 text-3xl'/>
          </div>
          <ul className="flex flex-col items-center justify-between min-h-[250px]">
            <li className="border-b-2 border-lime-500 my-8 uppercase">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="border-b-2 border-lime-500 my-8 uppercase">
              <Link href="/projects">Projects</Link>
            </li>
            <li className="border-b-2 border-lime-500 my-8 uppercase">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
};