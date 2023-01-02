import Image from "next/image";
import Link from 'next/link';

import PostInfo from './PostInfo';

export default function FeaturedPostCard({...post}) {  
  return (
    <article>
      <Link href={`/blog/${post.slug}`}>
        <div className="-mx-4 lg:items-center items-start">       
          <Image 
          src={post.thumbnail.url}
          alt={`${post.title} thumbnail`} 
          width='500'
          height='500'
          className="thumbnail"
          blurDataURL={post.blurDataURL}
          placeholder='blur'
          />
          <div className="w-full px-4">
            <PostInfo
                {...post}
            />
          </div>
        </div>
        <hr className="border-black/10 w-11/12 mx-auto mt-10 md:hidden dark:border-white/10" />
      </Link>
    </article>
  );
}