import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { getPostsByTopic, getTopics } from "@/services";
import { getPlaiceholder } from "plaiceholder";
import { Post, Topic } from "@/lib/types";
import BlogLayout from "@/components/BlogLayout";
import { useEffect, useState } from "react";

export default function Blog({ posts, topics,topic }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [isLoading, setIsLoading] = useState(false);
    
    // new posts loaded
    useEffect(()=> {
        setIsLoading(false)
    }, [posts]);

    return (
    <BlogLayout
        posts={posts}
        topics={topics}
        slug={topic}
        isLoading={isLoading}
    >
    </BlogLayout>
);
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ topic: string }>) {
    try {
        const { topic } = params as { topic: string };
        const rawPosts = await getPostsByTopic(topic) || [] 
        const posts = await Promise.all(
            rawPosts.map(async (post:Post) => {
                const { base64 } = await getPlaiceholder(post.thumbnail.url);
                return {
                ...post,
                blurDataURL: base64,
                };
            })
        )
        
        const topics = await getTopics() 

        return {
            props: {
                posts: posts,
                topics,
                topic
            },
            revalidate: 120
        };
    } catch {
        return { notFound: true };
    }
}

export async function getStaticPaths() {
    const topics = await getTopics(); 
    const paths = topics.map((topic: Topic) => ({
        params: {
            topic: topic.slug,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}