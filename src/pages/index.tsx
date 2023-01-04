import Link from "next/link";
import { InferGetStaticPropsType } from "next";

import FeaturedPostCard from "@/components/FeaturedPostCard";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import styles from '@/styles/styles.module.css'
import { getProfile, getFeaturedPosts, getFeaturedProjects } from '@/services';
import { getPlaiceholder } from 'plaiceholder'
import ProjectCard from "@/components/ProjectCard";
import { About, Post, Project } from '@/lib/types'


export default function home({ posts, projects, profile }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
    <Layout>
        <Seo/>
        <Hero 
        profile={profile}
        />
        <h3 className='mt-8 pb-2 sm:pb-6 '>
            Featured Posts
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
            {posts.map((post:{id:string}) => (
            <div key={post.id} className={`w-full px-4 rounded-xl pb-6 bg-white/70 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderPosts}`}>
                <FeaturedPostCard {...post} />
            </div>
            ))}
        </div>

        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex mx-auto mt-6 btn-primary"
        ><Link href='/blog'>View all posts</Link></button>

        <h3 className='mt-8 pb-2 sm:pb-6 '>
            Recent Projects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
            {projects.map((project:Project) => (
            <div key={project.id} className={`w-full px-4 rounded-xl pb-6 bg-white/70 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderPosts}`}>
                <ProjectCard {...project} />
            </div>
            ))}
        </div>
        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex mx-auto mt-6 btn-primary"
        ><Link href='/projects'>View all projects</Link></button>
        
    </Layout>
    );
}

export async function getStaticProps() {
    const featuredPosts = await getFeaturedPosts() || [] 
    const rawProfile = await getProfile()

    const posts = await Promise.all(
    featuredPosts.map(async (post:Post) => {
        const { base64 } = await getPlaiceholder(post.thumbnail.url);
        return {
        ...post,
        blurDataURL: base64,
        };
    })
    ).then((values) => values);

    const profile = await Promise.all(
        rawProfile.map(async (prof:About) => {
            const { base64 } = await getPlaiceholder(prof.image.url);
            return {
            ...prof,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);

    const featuredProjects = await getFeaturedProjects()
    const projects = await Promise.all(
        featuredProjects.map(async (project:Project) => {
            const { base64 } = await getPlaiceholder(project.thumbnail.url);
            return {
            ...project,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);

    return {
        props: { 
            posts,
            projects,
            profile: profile.length > 0 ? profile[0] : {}
        },
        revalidate: 120
    }
}