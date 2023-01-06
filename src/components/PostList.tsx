import PostCard from './PostCard';
import styles from '@/styles/styles.module.css'
import { Post } from '@/lib/types';

interface PostList {
    posts:Post[]
    isLoading?:boolean
    isSearching:boolean
}

export default function PostList({ posts, isLoading, isSearching }: PostList) {
    if (isLoading || isSearching) {
        return (
        <div className="flex justify-center items-center space-x-1" data-fade='3'>
            <div className="flex justify-center">
                <span className="circle animate-loader"></span>
                <span className="circle animate-loader animation-delay-200"></span>
                <span className="circle animate-loader animation-delay-400"></span>
            </div>
        </div>
        )
    }

    else if (posts.length === 0) {  
        return <p>Sorry, not found :(</p>
        
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {posts.map((post:Post) => (
                <div key={post.id} className={`w-full px-4 pb-6 bg-white/70 shadow-md hover:shadow-lg hover:scale-[1.02] duration-300 transition-transform eease-in-out dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderPosts}`}>
                    <PostCard post={post} />
                </div>
                ))}
            </div>
        );
    }
}

