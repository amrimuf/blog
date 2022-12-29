import Link from "next/link";
import { InferGetServerSidePropsType } from "next";

import FeaturedPostCard from "../components/FeaturedPostCard";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styles from '../styles/styles.module.css'
import { getProfile, getFeaturedPosts } from '../../services';

export default function home({ posts, profile }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
    <Layout>
        <Seo/>
        <Hero {...profile}/>
        <h1 className='text-2xl font-bold text-neutral-900 lg:text-5xl dark:text-neutral-100 lg:mt-12 pb-2 sm:pb-6 ' data-fade='0'>
            Featured Posts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
            {posts.filter((posts: { featured: boolean; }) => posts.featured != false).map((post:any) => (
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
        
    </Layout>
    );
}

export async function getServerSideProps() {
    const posts = await getFeaturedPosts() || [] 
    const profile = await getProfile()

    return {
        props: { 
            posts,
            profile: profile.length > 0 ? profile[0] : {}
        }
    }
}