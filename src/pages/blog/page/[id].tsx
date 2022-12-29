import { SetStateAction, useState, useEffect } from "react";
import { InferGetServerSidePropsType } from "next";

import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
import PostList from "../../../components/PostList";
import { getPosts, getPaginatePosts, getPageSize, getFilteredPosts } from '../../../../services';
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";

export default function Blog({ posts, postsPerPage, pageSize, currentPage, filteredPosts }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pageSize.pageInfo.pageSize / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const timeout = setTimeout(() => {
        setIsLoading(false);
    }, 8000);
    
    return () => clearTimeout(timeout);
    },[isLoading]);

    const [searchField, setSearchField] = useState("");
    const router = useRouter();
    const handleChange = (e: {target: {value: string}} ) => {
        e.target.value !== '' ?
        router.push(
            `/blog/page/search?q=${e.target.value}`,
        ) 
        : router.push('1')
        setSearchField(e.target.value) 
        setIsLoading(true)
    };

    return (     
        <Layout>
            <Seo
            templateTitle='Blog'
            description='Thoughts and tutorials about web development and programming.'
            />
            <h1 className='text-2xl font-bold text-neutral-900 lg:text-5xl dark:text-neutral-100' data-fade='0'>
                Blog
            </h1>
            <p className='mt-2 text-neutral-600 dark:text-neutral-400 mb-6' data-fade='1'>
            Thoughts and tutorials about web development and programming.
            </p>
            <div className="relative w-full mb-4">
                <input 
                className="px-4 py-2 border-2 border-lime-500 dark:border-lime-500 block w-full rounded-full bg-white/70 dark:bg-black/30 text-neutral-900 dark:text-neutral-100"
                type = "text" 
                placeholder = "Search articles"
                onChange = {handleChange} 
                />
                <svg className="absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            {posts.length > 0  ?
            <PostList 
                filteredPosts={ searchField == '' ? posts : filteredPosts} 
                isLoading={isLoading}
            />      
            : <div>Loading...</div> }
            <div className={searchField !== '' ? 'hidden' :'block'}>
                <Pagination
                    pageNumbers={pageNumbers}
                    currentPage={currentPage}
                    />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(req:any) {
    const postsPerPage = 3
    const currentPage = parseInt(req.params.id)
    const endPost = currentPage * postsPerPage - postsPerPage
    const posts = await getPaginatePosts(postsPerPage, endPost) || [] 
    const filteredPosts = await getFilteredPosts(req.query.q) || []
    const pageSize = await getPageSize()

    return {
        props: { posts, postsPerPage, pageSize, currentPage, filteredPosts }
    }
}