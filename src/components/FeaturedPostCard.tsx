import Image from "next/image";
import Link from 'next/link';

import PostInfo from './PostInfo';
import styles from '@/styles/styles.module.css'

// back here: combine with post card
export default function FeaturedPostCard({...post}) {  
  return (
    <div 
      className={`card ${styles.handDrawnBorderPosts}`}
    >
        <article className="-mx-4 lg:items-center items-start">       
          <Link  href={`/blog/${post.slug}`}><Image 
          src={post.thumbnail.url}
          alt={`${post.title} thumbnail`} 
          width='500'
          height='500'
          className="thumbnail"
          blurDataURL={post.blurDataURL}
          placeholder='blur'
          />
          </Link>
          <div className="w-full px-4">
            <PostInfo
                {...post}
            />
          </div>
        </article>
        <hr className="border-black/10 w-11/12 mx-auto mt-10 md:hidden dark:border-white/10" />
    </div>
  );
}