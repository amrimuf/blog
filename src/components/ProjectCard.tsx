import Image from 'next/image';
import Link from 'next/link';

import ProjectInfo from './ProjectInfo';
import styles from '@/styles/styles.module.css'
import { Project } from '@/lib/types'

export default function ProjectCard({ ...projectInfo }: Project) {
    return (
        <Link 
        href={`${projectInfo.post ? `blog/${projectInfo.post.slug}` : projectInfo.nolink}`}
        rel="noreferrer noopener"
        target="_blank"
        className={`card ${styles.handDrawnBorderPosts}`}
        >
            <article className='flex items-center gap-8 px-4'>
                <Image
                src={projectInfo.thumbnail.url}
                blurDataURL={projectInfo.blurDataURL}
                placeholder='blur'
                alt={projectInfo.title} 
                width='250' 
                height='250'
                className="md:block w-full rounded hidden object-cover h-16 w-16" />
                <ProjectInfo
                    {...projectInfo}
                />
            </article>
        </Link>
    );
}