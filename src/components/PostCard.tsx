import Image from 'next/image';
import Link from 'next/link';

import PostInfo from './PostInfo';

export default function PostCard({ post }: any) {
    return (
        <article className='-mx-4 lg:items-center items-start'>
            <Link href={`/${post.slug}`} >
                <Image 
                src={post.thumbnail.url} 
                alt={post.title} 
                width={500} 
                height={500} 
                className="w-full rounded-t mb-4 object-cover h-40"
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