import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { getPosts, getFilteredPosts } from '@/services';
import { getPlaiceholder } from "plaiceholder";
import { Post } from "@/lib/types";
import BlogSearch from "@/components/BlogSearch";

export default function Blog({ filteredPosts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
        return (     
            <BlogSearch
                posts={filteredPosts}
            />
        );
}

export async function getServerSideProps({ query, res}:GetServerSidePropsContext) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    const { q } = query as { q: string };

    // back here if "some" can be done in the hygraph query
    // only need postsId
    const postsId: string[] = []
    const allPosts = await getPosts() || [] 
        allPosts.filter((post:{title:string}) => {
            return (post.title.toLowerCase().split(" ").some((word:string) => q.toLowerCase().split(" ").some((query:string) => query === word || word.includes(query)))
            )
        }).map((result:{id:string}) => postsId.push(result.id))
    
    const rawFilteredPosts = await getFilteredPosts(postsId) || []
    const filteredPosts = await Promise.all(
        rawFilteredPosts.map(async (post:Post) => {
            const { base64 } = await getPlaiceholder(post.thumbnail.url);
            return {
            ...post,
            blurDataURL: base64,
            };
        })
    )

    return {
        props: { filteredPosts }
    }
}