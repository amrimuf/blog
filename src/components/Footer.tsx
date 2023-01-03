import Link from "next/link";
import moment from 'moment';
import styles from '../styles/styles.module.css'
import { SiInstagram, SiTwitter, SiGithub, SiLinkedin } from 'react-icons/si'


export default function Footer() {
    return (
      <footer className="sm:pb-24 py-12 pb-12 bottom-0 bg-white dark:bg-black">
        <div className="max-w-4xl px-4 mx-auto text-neutral-600 dark:text-neutral-400 lg:px-0">
          <div className={`pb-8 mb-2 ${styles.handDrawnLineTop}`}></div>
          <div className="flex flex-col justify-between lg:flex-row items-center">
            <p>Copyright &copy; {moment().format('y')}  Amri Mufti</p>
            <div className="flex flex-wrap pt-2 sm:space-x-4 space-x-2 font-medium lg:pt-0">
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.instagram.com/amri.4521'
                className="hover:text-lime-500"
              >
                <SiInstagram/>
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.twitter.com'
                className="hover:text-lime-500"
              >
                <SiTwitter/>
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.github.com/amrimuf'
                className="hover:text-lime-500"
              >
                <SiGithub/>
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.linkedin.com/in/amrimufti/'
                className="hover:text-lime-500"
              >
                <SiLinkedin/>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }