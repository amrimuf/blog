import { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from '../styles/styles.module.css'

export default function BackToTop() {
    const [toTopButton, setToTopButton] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setToTopButton(window.pageYOffset > 200)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <button
        className={`flex justify-center items-center fixed bottom-[20px] right-[25px] pointer-cursor dark:bg-black shadow-lime-400/20 shadow-lg bg-white opacity-50 hover:opacity-70 transition-[opacity, transform] duration-300 ease-in-out ${styles.handDrawnBorderCircle} ${toTopButton ? 'rotate-0': 'rotate-180'}`}
        onClick={() =>
            window.scrollTo({
            top: toTopButton ? 0 : document.body.scrollHeight,
            behavior: 'smooth',
            })
        }
        aria-label='Back to top'
        >
            <i className="bi bi-chevron-up mx-[11px] my-[6px] text-lime-500" style={{ fontSize:18, WebkitTextStroke:3 }}></i>
        </button>
    )
}