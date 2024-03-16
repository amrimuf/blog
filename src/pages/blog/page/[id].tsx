import {GetStaticPropsContext, InferGetStaticPropsType } from "next";

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

export async function getStaticProps({params}:GetStaticPropsContext) {
    try {
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
    const topics = await getTopics() || [] 

    return {
        props: { pageNumbers, currentPage, paginatedPosts, topics },
        revalidate: 120
    }
    } catch {
        return { notFound: true };
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
        fallback: "blocking",
    }
}