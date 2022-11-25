import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';
import moment from 'moment';

export default function Footer() {
    return (
      <footer className="sm:pb-24 py-12 pb-12 bottom-0 bg-white dark:bg-black">
        <div className="max-w-4xl px-4 mx-auto text-neutral-600 dark:text-neutral-400 lg:px-0">
          <div className="pb-8 mb-2 border-t-4 border-lime-500"></div>
          <div className="flex flex-col justify-between lg:flex-row items-center">
            <div>
              <p>Copyright &copy; {moment().format('y')}  Amri Mufti</p>
            </div>
            <div className="flex flex-wrap pt-2 sm:space-x-4 space-x-2 font-medium lg:pt-0">
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.instagram.com/amri.4521'
                className="text-base font-normal text-neutral-600 dark:text-neutral-400 hover:text-lime-500 dark:hover:text-lime-500"
              >
                <i className="bi bi-instagram h-5 w-5" style={{ fontSize: 18 }}></i>
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.twitter.com'
                className="text-base font-normal text-neutral-600 dark:text-neutral-400 hover:text-lime-500 dark:hover:text-lime-500"
              >
                <i className="bi bi-twitter h-5 w-5" style={{ fontSize: 18 }}></i>
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.github.com/amrimuf'
                className="text-base font-normal text-neutral-600 dark:text-neutral-400 hover:text-lime-500 dark:hover:text-lime-500"
              >
                <i className="bi bi-github h-5 w-5" style={{ fontSize: 18 }}></i>
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href='https://www.linkedin.com/in/amrimufti/'
                className="text-base font-normal text-neutral-600 dark:text-neutral-400 hover:text-lime-500 dark:hover:text-lime-500"
              >
                <i className="bi bi-linkedin h-5 w-5" style={{ fontSize: 18 }}></i>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }