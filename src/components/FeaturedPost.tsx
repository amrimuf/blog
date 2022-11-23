import Image from "next/image";
import Link from 'next/link';

import PostInfo from './PostInfo';


type PostType = {
  slug:string;
  thumbnail: {
    url:string
  };
  category:string;
  createdAt:string;
  title:string;
  headline:string
}

export default function FeaturedPost({...post}:PostType) {  
  return (
    <article>
      <div className=" -mx-4 lg:items-center items-start">
          <Link href={`/${post.slug}`}>
              <Image 
              src={post.thumbnail.url}
              alt={`thumbnail ${post.title}`} 
              width={800} 
              height={800} 
              className="object-cover h-40 mb-4 rounded-t-lg"
              blurDataURL={`/_next/image?url=${post.thumbnail.url}&w=16&q=1`}
              placeholder='blur'
              />
          </Link>
        <div className="w-full px-4">
          <PostInfo
            category={post.category}
            createdAt={post.createdAt}
            title={post.title}
            headline={post.headline}
            slug={post.slug}
          />
        </div>
      </div>
      <hr className="border-black/10 w-11/12 mx-auto mt-10 md:hidden dark:border-white/10" />
    </article>
  );
}