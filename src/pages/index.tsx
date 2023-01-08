import Link from "next/link";
import { getPlaiceholder } from 'plaiceholder'
import { InferGetStaticPropsType } from "next";

import FeaturedPostCard from "@/components/FeaturedPostCard";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ProjectCard from "@/components/ProjectCard";
import { getProfile, getFeaturedPosts, getRecentProjects } from '@/services';
import { About, Post, Project } from '@/lib/types'


export default function home({ featuredPosts, recentProjects, profile }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>TEST</>
    // <Layout>
    //     <Seo/>
        
        
    //     <h2 className='mt-8 pb-2 sm:pb-6 ' data-fade='3'>
    //         Featured Posts
    //     </h2>
    //     <section data-fade="4">
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
    //             {featuredPosts.map((post:{id:string}) => (
    //                 <FeaturedPostCard key={post.id} {...post} />
    //             ))}
    //         </div>
    //         <div className="flex">
    //             <Link href='/blog' className=" mx-auto mt-6 btn-primary">
    //                     View all posts
    //             </Link>
    //         </div>
    //     </section>

        
    //     <h2 className='mt-8 pb-2 sm:pb-6 ' data-fade='5'>
    //         Recent Projects
    //     </h2>
    //     <section data-fade="6">
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
    //             {recentProjects.map((project:Project) => (
    //                 <ProjectCard key={project.id} {...project} />
    //             ))}
    //         </div>
    //         <div className="flex">
    //             <Link href='/projects' className="mx-auto mt-6 btn-primary">
    //                     View all projects
    //             </Link>
    //         </div>  
    //     </section>
        
    // </Layout>
    );
}

export async function getStaticProps() {
    const rawFeaturedPosts = await getFeaturedPosts() || [] 
    const rawProfile = await getProfile()

    const featuredPosts = await Promise.all(
        rawFeaturedPosts.map(async (post:Post) => {
            const { base64 } = await getPlaiceholder(post.thumbnail.url);
            return {
            ...post,
            blurDataURL: base64,
            };
        })
    )

    const profile = await Promise.all(
        rawProfile.map(async (prof:About) => {
            const { base64 } = await getPlaiceholder(prof.image.url);
            return {
            ...prof,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);

    const rawRecentProjects = await getRecentProjects()
    const recentProjects = await Promise.all(
        rawRecentProjects.map(async (project:Project) => {
            const { base64 } = await getPlaiceholder(project.thumbnail.url);
            return {
            ...project,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);

    return {
        props: { 
            featuredPosts,
            recentProjects,
            profile: profile.length > 0 ? profile[0] : []
        },
        revalidate: 120
    }
}