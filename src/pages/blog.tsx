import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PostCard from '../components/PostCard';
import { getPosts } from '../../services';


export default function blog({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (     
        <Layout>
            <Seo
            templateTitle='Blog'
            description='Thoughts, mental models, and tutorials about front-end development. Rebuild your mental model so front-end development can be predictable.'
            />
            <h1 className='text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white' data-fade='0'>
                Blog
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300 mb-6' data-fade='1'>
            I've been programming for almost 6 years now. Throughout this year, I've worked with various technologies. I'm here to share just that.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 w-full">
                {posts.map((post:any) => (
                <div key={post.id} className="w-full px-4 border-2 rounded-lg border-sky-500 pb-6">
                <PostCard {...post} />
                </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const posts = await getPosts() || [] 

    return {
        props: { posts }
    }
}