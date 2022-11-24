import Link from "next/link";
import { InferGetServerSidePropsType } from "next";

import FeaturedPost from "../components/FeaturedPost";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styles from '../styles/styles.module.css'
import { getAbout, getPosts } from '../../services';

export default function home({ posts, about }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
    <Layout>
        <Seo/>
        <Hero {...about}/>
        <h1 className='text-2xl font-bold text-gray-900 lg:text-5xl dark:text-gray-100 lg:mt-12 pb-2 sm:pb-6 ' data-fade='0'>
            Featured Posts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full">
            {posts.filter((posts: { featured: boolean; }) => posts.featured != false).map((post:any) => (
            <div key={post.id} className={`w-full px-4 rounded-xl pb-6 bg-white/70 shadow-md hover:shadow-lg hover:scale-[1.02] duration-300 ease-in-out dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderPosts}`}>
                <FeaturedPost {...post} />
            </div>
            ))}
        </div>

        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="flex mx-auto mt-6 px-6 py-2.5 bg-lime-500 dark:text-gray-900 text-gray-100 font-medium text-xs leading-tight uppercase rounded-full shadow-md dark:shadow-lime-700 hover:scale-[1.02] hover:shadow-lg transition duration-150 ease-in-out"
        ><Link href='/blog'>View all posts</Link></button>
        
    </Layout>
    );
}

export async function getServerSideProps() {
    const posts = await getPosts() || [] 
    const abouts = await getAbout()

    return {
        props: { 
            posts,
            about: abouts.length > 0 ? abouts[0] : {}
        }
    }
}