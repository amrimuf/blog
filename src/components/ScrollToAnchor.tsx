import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Prism from 'prismjs';

function ScrollToAnchor({isClient}:{isClient:boolean}): null {
    const router = useRouter();
    const lastHash = useRef('');
    const navbarHeight = 110;

    useEffect(() => {
        Prism.highlightAll();
        if (router.asPath.includes('#')) {
        lastHash.current = router.asPath.slice(router.asPath.indexOf('#') + 1);
        }

        if (lastHash.current.length > 0 && isClient) {
        setTimeout(() => {
            const element = document.getElementById(lastHash.current);
            if (element) {
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - navbarHeight,
                        behavior: 'smooth'
                    });
            }
        }, 100);
        }
    }, [router.asPath, isClient]);

    return null;
}

export default ScrollToAnchor;
