import * as React from 'react';

import { usePreloadState } from '@/context/PreloadContext';
import { useRouter } from 'next/router';

export default function useLoaded() {
    const preloaded = usePreloadState();
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    const router = useRouter()

    React.useEffect(() => {
        if (preloaded) {
        setIsLoaded(true);
        } else {
        setIsLoaded(false)
        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
        }
    }, [preloaded, router.asPath]);

    return isLoaded;
}