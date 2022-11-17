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
    link:string;
    thumbnail: {
        url:string
    }
};

export default function ProjectCard({ ...projectInfo }: ProjectInfoType) {
    return (
        <article className='flex border-2 rounded-lg border-sky-500 justify-center items-center px-6 space-x-6'>
            <Link href={`https://${projectInfo.link}`} >
                <Image src={projectInfo.thumbnail.url} alt={projectInfo.title} width={60} height={60} className="md:block w-full rounded hidden" />
            </Link>
            <ProjectInfo
                {...projectInfo}
            />
        </article>
    );
}