import Image from 'next/image';
import Link from 'next/link';

import ProjectInfo from './ProjectInfo';

type ProjectInfoType = {
    category: string;
    createdAt: string;
    title: string;
    headline: string;
    slug: string;
    author: string;
    description:string;
    tags: string[]
    thumbnail: {
        url:string
    }
    post: {
        slug: string
    }
};

export default function ProjectCard({ ...projectInfo }: ProjectInfoType) {
    const newImageSrc = projectInfo.thumbnail.url.toString().replace(/[()]/g, '');
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
        <Link href={`${projectInfo.post.slug}`}>
            <article className='flex border-2 rounded-lg border-sky-500 justify-center items-center px-6 space-x-6 hover:scale-[1.02]'>
                <Image
                src={newImageSrc}
                blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`}
                placeholder='blur'
                alt={projectInfo.title} width={500} height={500} className="md:block w-full rounded hidden object-cover h-16 w-16" />
                <ProjectInfo
                    {...projectInfo}
                />
            </article>
        </Link>
    );
}