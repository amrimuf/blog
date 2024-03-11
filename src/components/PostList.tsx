import PostCard from './PostCard';
import { Post } from '@/lib/types';

import clsx from "clsx";

interface PostList {
    posts:Post[]
    isLoading?:boolean
    isSearching:boolean
    searchField: string | string[]
}

export default function PostList({ posts, isLoading, isSearching, searchField }: PostList) {
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
        return <p className={clsx(searchField ? 'text-center' : 'text-left','font-semibold !text-lime-500 text-lg mt-2')}>{searchField ? 'Sorry, no results found :(' : 'My first post - coming soon!'}</p>
        
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {posts.map((post:Post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        );
    }
}

