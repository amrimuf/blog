import PostCard from './PostCard';
import styles from '../styles/styles.module.css'
import { useState, useEffect } from 'react';

export default function PostList({ filteredPosts }: any) {
    if (filteredPosts.length === 0) {
        const [count, setCount] = useState('Loading...');

        useEffect(() => {
        const timeout = setTimeout(() => {
            setCount('Sorry, not found :(');
        }, 3000);
        
        return () => clearTimeout(timeout);
        },[count]);
        
        return <h1>{count}</h1>
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {filteredPosts.map((post:any) => (
                <div key={post.id} className={`w-full px-4 pb-6 bg-white/70 shadow-md hover:shadow-lg hover:scale-[1.02] duration-300 transition-transform eease-in-out dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderPosts}`}>
                    <PostCard post={post} />
                </div>
                ))}
            </div>
        );
    }
}

