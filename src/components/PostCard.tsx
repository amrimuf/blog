import Image from 'next/image';
import Link from 'next/link';

import PostInfo from './PostInfo';

export default function PostCard({ post }: any) {
    const newImageSrc = post.thumbnail.url.toString().replace(/[()]/g, '');
    const convertImage = (w:number, h:number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
        <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
        </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

    const toBase64 = (str:string) =>
        typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);

    return (
        <article className='-mx-4 lg:items-center items-start'>
            <Link href={`/${post.slug}`} >
                <Image src={newImageSrc} alt={post.title} width={500} height={500} className="w-full rounded-t mb-4 object-cover h-48" blurDataURL={`data:image/svg+xml;base64,${toBase64(
                convertImage(700, 475))}`} placeholder='blur'/>
            </Link>
            <div className="w-full px-4">
                <PostInfo
                    {...post}
                />
            </div>
            <hr className="border-black/10 w-11/12 mx-auto mt-10 md:hidden dark:border-white/10" />
        </article>
    );
}