import { SetStateAction, useState } from "react";
import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SearchList from "../components/SearchList";
import { getPosts } from '../../services';

export default function blog({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [searchField, setSearchField] = useState("");

    const filteredPosts = posts.filter(
        (post: { title: string; category: string; isBlog:boolean })  => {
            return (
            post.title
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            post.category
            .toLowerCase()
            .includes(searchField.toLowerCase())
            );
        }
    )

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchField(e.target.value);
    };
    
    return (     
        <Layout>
            <Seo
            templateTitle='Blog'
            description='Thoughts and tutorials about web development and programming.'
            />
            <h1 className='text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white' data-fade='0'>
                Blog
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300 mb-6' data-fade='1'>
            I've been programming for almost 6 years now. Throughout this year, I've worked with various technologies. I'm here to share just that.
            </p>
            <div className="relative w-full mb-4">
                <input 
                className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                type = "text" 
                placeholder = "Search articles"
                onChange = {handleChange} 
                />
                <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <SearchList filteredPosts={filteredPosts} />
        </Layout>
    );
}

export async function getServerSideProps() {
    const posts = await getPosts() || [] 

    return {
        props: { posts }
    }
}