import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { getPosts, getFilteredPosts, getTopics } from '@/services';
import { getPlaiceholder } from "plaiceholder";
import { Post, Topic } from "@/lib/types";
import BlogLayout from "@/components/BlogLayout";

export default function Blog({ filteredPosts, topics }: InferGetServerSidePropsType<typeof getServerSideProps>) {
        return (     
            <BlogLayout
                posts={filteredPosts}
                topics={topics}
            />
        );
}

export async function getServerSideProps({ query, res}:GetServerSidePropsContext) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    const { q, t } = query as { q: string, t:string };

    // !!!back here if "some" can be done in the hygraph query
    // only need postsId
    // make it accept description too
    const postsId: string[] = []
    const allPosts = await getPosts() || [] 
        allPosts.filter((post:{title:string,headline:string,category:string,topics:Topic[]}) => {
            return (post.title.toLowerCase().split(" ").some((word:string) => q.toLowerCase().split(" ").some((query:string) => query === word || word.includes(query)))
            || post.headline.toLowerCase().split(" ").some((word:string) => q.toLowerCase().split(" ").some((query:string) => query === word || word.includes(query)))
            || post.category.toLowerCase().split(" ").some((word:string) => q.toLowerCase().split(" ").some((query:string) => query === word || word.includes(query)))
            || post.topics.some((word:{name:string}) => q.toLowerCase().split(" ").some((query:string) => query === word.name || word.name.includes(query)))
            )
        }).map((result:{id:string}) => postsId.push(result.id))
    
    const rawFilteredPosts = await getFilteredPosts(postsId, t ?? '') || []
    const filteredPosts = await Promise.all(
        rawFilteredPosts.map(async (post:Post) => {
            const { base64 } = await getPlaiceholder(post.thumbnail.url);
            return {
            ...post,
            blurDataURL: base64,
            };
        })
    )
    const topics = await getTopics() 

    return {
        props: { filteredPosts, topics }
    }
}