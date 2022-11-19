import { useState, FC, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from '../styles/styles.module.css'

const BackToTop: FC = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
    const toggleVisibility = () => {
        setShowButton(window.pageYOffset > 200)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
    <>
        <button
        className={styles.top}
        onClick={() =>
            window.scrollTo({
            top: showButton ? 0 : document.body.scrollHeight,
            behavior: 'smooth',
            })
        }
        style={{ transform: showButton ? 'rotate(0deg)' : 'rotate(180deg)' }}
        aria-label='Back to top'
        >
        <i className="bi bi-chevron-double-up mx-[16px] my-[10px]" style={{ fontSize:24 }}></i>
        </button>
    </>
    )
}

export default BackToTop