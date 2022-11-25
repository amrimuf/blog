import Image from 'next/image';
import Link from 'next/link';

import PostInfo from './PostInfo';

type PostType = {
    post: {
        slug: string;
        thumbnail: {
            url: string
        };
        title: string;
        category: string;
        createdAt: string;
        headline: string;
    }
}

export default function PostCard({ post }: PostType) {
    return (
        <article className='-mx-4 lg:items-center items-start'>
            <Link href={`/${post.slug}`} >
                <Image 
                src={post.thumbnail.url} 
                alt={`${post.title} thumbnail`} 
                width={500} 
                height={500} 
                className="thumbnail"
                blurDataURL={`/_next/image?url=${post.thumbnail.url}&w=16&q=1`}
                placeholder='blur'/>
            </Link>
            <div className="w-full px-4">
                <PostInfo
                    {...post}
                />
            </div>
            <hr className="border-black/20 w-11/12 mx-auto mt-10 md:hidden dark:border-white/20" />
        </article>
    );
}