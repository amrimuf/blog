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
    technology:string[];
    thumbnail: {
        url:string
    }
    post: {
        slug: string
    }
};

export default function ProjectCard({ ...projectInfo }: ProjectInfoType) {
    return (
        <Link href={`${projectInfo.post.slug}`}>
            <article className='flex border-2 rounded-lg border-sky-500 justify-center items-center px-6 space-x-6 hover:scale-[1.02]'>
                <Image src={projectInfo.thumbnail.url} alt={projectInfo.title} width={500} height={500} className="md:block w-full rounded hidden object-cover h-16 w-16" />
                <ProjectInfo
                    {...projectInfo}
                />
            </article>
        </Link>
    );
}