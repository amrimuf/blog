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
  const newImageSrc = post.thumbnail.url.toString().replace(/[()]/g, '');
  console.log(newImageSrc)
  const convertImage = (w:number, h:number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
      <linearGradient id="g">
        <stop stop-color="#eee" offset="20%" />
        <stop stop-color="#ccc" offset="50%" />
        <stop stop-color="#eee" offset="70%" />
      </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#eee" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`;

      const toBase64 = (str:string) =>
      typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);
  
  return (
    <article>
      <div className=" -mx-4 lg:items-center items-start">
          <Link href={`/${post.slug}`}>
              <Image 
              src={post.thumbnail.url} 
              alt={`thumbnail ${post.title}`} 
              width={500} 
              height={500} 
              className="object-cover h-40 mb-4 rounded-t-lg"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`}
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