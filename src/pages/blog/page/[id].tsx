import {GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getPaginatedPosts, getPageSize } from '@/services';
import Pagination from "@/components/Pagination";
import { getPlaiceholder } from "plaiceholder";
import { Post } from "@/lib/types";
import BlogSearch from "@/components/BlogSearch";
import { getPageNumbers } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function Blog({ pageNumbers, currentPage, paginatedPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [isLoading, setIsLoading] = useState(false);
    
        // new posts loaded
        useEffect(()=> {
            setIsLoading(false)
        }, [paginatedPosts]);
        return (    
            <BlogSearch
                posts={paginatedPosts}
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

export async function getStaticProps({params}:GetStaticPropsContext) {
    const pageSize = await getPageSize()
    const pageNumbers = getPageNumbers(pageSize).pageNumbers;
    const postsPerPage = getPageNumbers(pageSize).postsPerPage
    const { id } = params as { id: string };
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
    )

    return {
        props: { pageNumbers, currentPage, paginatedPosts },
        revalidate: 120
    }
}

export async function getStaticPaths() {
    const pageSize = await getPageSize()
    const pageNumbers = getPageNumbers(pageSize).pageNumbers

    const paths = Array.from(pageNumbers, (element, index) => ({
            params: {
                id: (element).toString(),
            },
        }));

    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }
}