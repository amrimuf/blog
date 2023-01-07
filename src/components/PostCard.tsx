import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/types';

import PostInfo from './PostInfo';
import styles from '@/styles/styles.module.css'

export default function PostCard({ post }: {post: Post}) {
    return (
        <Link href={`/blog/${post.slug}`} className={`card ${styles.handDrawnBorderPosts}`}>
                <article className='-mx-4 lg:items-center items-start'>
                        <Image 
                        src={post.thumbnail.url} 
                        alt={`${post.title} thumbnail`} 
                        width='500'
                        height='500' 
                        className="thumbnail"
                        blurDataURL={post.blurDataURL}
                        placeholder='blur'/>
                        <div className="w-full px-4">
                            <PostInfo
                                {...post}
                            />
                        </div>
                        <hr className="border-black/20 w-11/12 mx-auto mt-10 md:hidden dark:border-white/20" />
                </article>
            </Link>
    );
}