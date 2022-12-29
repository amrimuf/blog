import { SetStateAction, useState, useEffect } from "react";
import { InferGetServerSidePropsType } from "next";

import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
import PostList from "../../../components/PostList";
import { getPosts, getPaginatePosts, getPageSize, getFilteredPosts } from '../../../../services';
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";

export default function Blog({ posts, postsPerPage, pageSize, currentPage, filteredPosts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pageSize.pageInfo.pageSize / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [isLoading, setIsLoading] = useState(false);

      // loading new posts
    useEffect(()=> {
        setIsLoading(true);
    }, [router.query?.id]);
    
    // new posts loaded
    useEffect(()=> {
        setIsLoading(false)
    }, [filteredPosts]);

    const [searchField, setSearchField] = useState(router.query.q ? router.query.q : '' );

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
                value={searchField}
                onChange = {handleChange} 
                />
                <svg className="absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            {posts.length > 0  ?
            <PostList 
                filteredPosts={ searchField !== '' ? filteredPosts : posts} 
                isLoading={isLoading}
            />      
            : <div>Loading...</div> }
            <div className={ searchField !== '' ? 'hidden' :'blok'}>
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
    const pageSize = await getPageSize()

    const allPosts = await getPosts() || [] 
    const results = allPosts.filter((post:any) => {
        return ( post.title.toLowerCase().split(" ").some((word:any) => req.query.q?.toLowerCase().split(" ").some((query:any) => query === word || word.includes(query)))
        )
    })
    const postsId: string[] = []
    results.map((result:any) => postsId.push(result.id))
    const filteredPosts = await getFilteredPosts(postsId) || []

    return {
        props: { posts, postsPerPage, pageSize, currentPage, filteredPosts }
    }
}