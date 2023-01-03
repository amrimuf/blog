import Link from "next/link";
import { InferGetServerSidePropsType } from "next";

import FeaturedPostCard from "../components/FeaturedPostCard";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styles from '../styles/styles.module.css'
import { getProfile, getFeaturedPosts, getFeaturedProjects } from '../../services';
import { getPlaiceholder } from 'plaiceholder'
import ProjectCard from "../components/ProjectCard";

export default function home({ posts, projects, profile }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
    <Layout>
        <Seo/>
        <Hero 
        profile={profile}
        />
        <h1 className='text-2xl font-bold text-neutral-900 lg:text-5xl dark:text-neutral-100 lg:mt-12 pb-2 sm:pb-6 ' data-fade='0'>
            Featured Posts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
            {posts.map((post:any) => (
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
        ><Link href='/blog/page/1'>View all posts</Link></button>

        <h1 className='text-2xl font-bold text-neutral-900 lg:text-5xl dark:text-neutral-100 lg:mt-12 pb-2 sm:pb-6 ' data-fade='0'>
            Featured Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
            {projects.map((project:any) => (
            <div key={project.id} className={`w-full px-4 rounded-xl pb-6 bg-white/70 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderPosts}`}>
                <ProjectCard {...project} />
            </div>
            ))}
        </div>
        
    </Layout>
    );
}

export async function getServerSideProps() {
    const featuredPosts = await getFeaturedPosts() || [] 
    const rawProfile = await getProfile()

    const posts = await Promise.all(
    featuredPosts.map(async (post:any) => {
        const { base64 } = await getPlaiceholder(post.thumbnail.url);
        return {
        ...post,
        blurDataURL: base64,
        };
    })
    ).then((values) => values);

    const profile = await Promise.all(
        rawProfile.map(async (prof:any) => {
            const { base64 } = await getPlaiceholder(prof.image.url);
            return {
            ...prof,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);

    const featuredProjects = await getFeaturedProjects()
    const projects = await Promise.all(
        featuredProjects.map(async (project:any) => {
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
        }
    }
}