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
              <Image src={post.thumbnail.url} alt={`thumbnail ${post.title}`} width={0} height={0} layout={'responsive'} className="mb-4"/>
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
      <hr className="border-black/10 w-10/12 mx-auto mt-10 md:hidden dark:border-white/10" />
    </article>
  );
}