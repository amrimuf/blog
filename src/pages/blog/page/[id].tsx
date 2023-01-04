import { useState, useEffect } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
import PostList from "../../../components/PostList";
import { getPosts, getPaginatedPosts, getPageSize, getFilteredPosts } from '../../../../services';
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import NotFoundPage from "../../404"
import { getPlaiceholder } from "plaiceholder";
import { Post } from "../../../lib/types";

export default function Blog({ pageNumbers, currentPage, posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    
    // new posts loaded
    useEffect(()=> {
        setIsLoading(false)
    }, [posts]);
    

    const [searchField, setSearchField] = useState(router.query.q ? router.query.q : '' );

    const handleChange = (e: {target: {value: string}} ) => {
        if (e.target.value == '') {
            setIsTyping(false)
            router.push('1')
            setIsLoading(true)
        } else {
            setIsTyping(true)
        }
        
        
        setSearchField(e.target.value) 
    };


    const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key == 'Enter') {
            router.push(`/blog/page/search?q=${searchField}`,
        
        ) 
        setIsLoading(true)
        setIsTyping(false)
        }
    };

    if (!/^[0-9]+$/.test(router.asPath.split('/')[3]) && router.query.id !== 'search') {
        return <NotFoundPage/>
    } else {
        return (     
            <Layout>
                <Seo
                templateTitle='Blog'
                description='Thoughts and tutorials about web development and programming.'
                />
                <h1>
                    Blog
                </h1>
                <p className='mt-2 mb-6'>
                Thoughts and tutorials about web development and programming.
                </p>
                <div className="relative w-full mb-4">
                    <input 
                    className="px-4 py-2 border-2 border-lime-500 dark:border-lime-500 block w-full rounded-full bg-white/70 dark:bg-black/30"
                    type = "text" 
                    placeholder = "Search articles"
                    value={searchField}
                    onChange = {handleChange} 
                    onKeyUp = {handleKeyUp}
                    />
                    <svg className="absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>

                {!isLoading ?
                !isTyping ?
                <PostList 
                    posts={posts} 
                /> 
                : <span>Press enter to see the results.</span>
                : <span>Loading...</span> }

                <div className={ searchField.length !== 0 || router.query.q || pageNumbers.length < 2 ? 'hidden' :'blok'}>
                    <Pagination
                        pageNumbers={pageNumbers}
                        currentPage={currentPage}
                        setIsLoading={setIsLoading}
                    />
                </div>
            </Layout>
        );
    }
}

export async function getServerSideProps({params, query, res}:GetServerSidePropsContext) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    const { id } = params as { id: string };
    const { q } = query as { q: string };
    const postsPerPage = 3
    const currentPage = parseInt(id)
    const endPost = currentPage * postsPerPage - postsPerPage
    const rawPaginatedPosts = await getPaginatedPosts(postsPerPage, endPost) || [] 
    const paginatedPosts = await Promise.all(
        rawPaginatedPosts.map(async (post:Post) => {
            const { base64 } = await getPlaiceholder(post.thumbnail.url);
            return {
            ...post,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);


    const pageSize = await getPageSize()
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pageSize.pageInfo.pageSize / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // back here if "some" can be done in the hygraph query
    const postsId: string[] = []
    if (q) {
        const allPosts = await getPosts() || [] 
        allPosts.filter((post:{title:string}) => {
            return (post.title.toLowerCase().split(" ").some((word:string) => q.toLowerCase().split(" ").some((query:string) => query === word || word.includes(query)))
            )
        }).map((result:{id:string}) => postsId.push(result.id))
    }
    const rawFilteredPosts = await getFilteredPosts(postsId) || []
    const filteredPosts = await Promise.all(
        rawFilteredPosts.map(async (post:Post) => {
            const { base64 } = await getPlaiceholder(post.thumbnail.url);
            return {
            ...post,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);

    return {
        props: { pageNumbers, currentPage, posts: q ? filteredPosts : paginatedPosts }
    }
}