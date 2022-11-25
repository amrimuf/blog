import Image from 'next/image';
import Link from 'next/link';

import ProjectInfo from './ProjectInfo';
import styles from '../styles/styles.module.css'

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
    return (
        <Link href={`${projectInfo.post.slug}`}>
            <article className={`flex bg-white/60 dark:bg-black/30 justify-center items-center px-6 space-x-6 shadow-md dark:sahdow-lime-700 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 dark:shadow-lime-700 ${styles.handDrawnBorderProjects}`}>
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