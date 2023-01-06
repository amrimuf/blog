import { InferGetStaticPropsType } from "next";

import { getPaginatedPosts, getPageSize } from '@/services';
import Pagination from "@/components/Pagination";
import { getPlaiceholder } from "plaiceholder";
import { Post } from "@/lib/types";
import BlogSearch from "@/components/BlogSearch";
import { getPageNumbers } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function Blog({ pageNumbers, currentPage, posts }: InferGetStaticPropsType<typeof getStaticProps>) {

    const [isLoading, setIsLoading] = useState(false);
    
       // new posts loaded
        useEffect(()=> {
            setIsLoading(false)
        }, [posts]);

        return (     
            <BlogSearch
                posts={posts}
                isLoading={isLoading}
            >
                <Pagination
                    pageNumbers={pageNumbers}
                    currentPage={currentPage}
                    setIsLoading={setIsLoading}
            />
            </BlogSearch>
        );
}

export async function getStaticProps() {
    const pageSize = await getPageSize()
    const postsPerPage = getPageNumbers(pageSize).postsPerPage
    const pageNumbers = getPageNumbers(pageSize).pageNumbers
    const currentPage = 1
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

    return {
        props: { pageNumbers, currentPage, posts: paginatedPosts },
        revalidate: 120
    }
}