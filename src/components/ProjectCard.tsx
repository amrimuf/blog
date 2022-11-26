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
    nolink: string
};

export default function ProjectCard({ ...projectInfo }: ProjectInfoType) {
    return (
        <Link 
        href={`${projectInfo.post ? projectInfo.post.slug : projectInfo.nolink}`}
            rel="noreferrer noopener"
            target="_blank"
        >
            <article className='flex items-center gap-8 px-4'>
                <Image
                src={projectInfo.thumbnail.url}
                blurDataURL={`/_next/image?url=${projectInfo.thumbnail.url}&w=16&q=1`}
                placeholder='blur'
                alt={projectInfo.title} width={500} height={500} className="md:block w-full rounded hidden object-cover h-16 w-16" />
                <ProjectInfo
                    {...projectInfo}
                />
            </article>
        </Link>
    );
}