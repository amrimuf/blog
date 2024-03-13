import { InferGetStaticPropsType } from "next";

import { getPaginatedPosts, getPageSize, getTopics } from '@/services';
import Pagination from "@/components/Pagination";
import { getPlaiceholder } from "plaiceholder";
import { Post } from "@/lib/types";
import BlogLayout from "@/components/BlogLayout";
import { getPageNumbers } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function Blog({ pageNumbers, currentPage, paginatedPosts, topics }: InferGetStaticPropsType<typeof getStaticProps>) {

    const [isLoading, setIsLoading] = useState(false);
    
       // new posts loaded
        useEffect(()=> {
            setIsLoading(false)
        }, [paginatedPosts]);

        return (     
            <BlogLayout
                posts={paginatedPosts}
                isLoading={isLoading}
                topics={topics}
            >
                <Pagination
                    pageNumbers={pageNumbers}
                    currentPage={currentPage}
                    setIsLoading={setIsLoading}
            />
            </BlogLayout>
        );
}

export async function getStaticProps() {
    const topics = await getTopics() 

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
    )

    return {
        props: { pageNumbers, currentPage, paginatedPosts, topics },
        revalidate: 120
    }
}