import Image from "next/image";
import Link from 'next/link';

import PostInfo from './PostInfo';

export default function FeaturedPostCard({...post}) {  
  return (
    <article>
      <div className="-mx-4 lg:items-center items-start">
          <Link href={`/blog/${post.slug}`}>
              <Image 
              src={post.thumbnail.url}
              alt={`${post.title} thumbnail`} 
              width={800} 
              height={800} 
              className="thumbnail"
              blurDataURL={`/_next/image?url=${post.thumbnail.url}&w=16&q=1`}
              placeholder='blur'
              />
          </Link>
        <div className="w-full px-4">
          <PostInfo
              {...post}
          />
        </div>
      </div>
      <hr className="border-black/10 w-11/12 mx-auto mt-10 md:hidden dark:border-white/10" />
    </article>
  );
}