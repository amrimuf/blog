import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import Layout from '@/components/Layout';
import PostMetaTitle from '@/components/PostMetaTitle';
import Seo from '@/components/Seo';
import { getPost, getNextPrevPosts, getPosts } from '@/services';
import Link from 'next/link';
import styles from '@/styles/styles.module.css'
import { getPlaiceholder } from 'plaiceholder';
import { Post } from '@/lib/types';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ShareButtons from '@/components/Share';

export default function Detail({ post, blurDataURL, prevSlug, prevTitle, nextSlug, nextTitle }:InferGetStaticPropsType<typeof getStaticProps>) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const prevUrl = post.isBlog != false ? 'blog' : 'projects'
        return (
            <Layout>
                <Seo
                templateTitle={post.title}
                description={post.headline}
                isBlog
                banner={post.thumbnail.url}
                />

                <nav className="lg:w-10/12 mx-auto rounded-full hidden sm:block px-2 py-1" data-fade='0'>
                <ol className="list-reset flex">
                    <li><Link href="/" className="text-lime-500 hover:underline">Home</Link></li>
                    <li><span className="text-gray-500 mx-2 ">/</span></li>
                    <li><Link href={`/${prevUrl}`} className="text-lime-500 hover:underline capitalize">{prevUrl}</Link></li>
                    <li><span className="text-gray-500 mx-2">/</span></li>
                    <li className='capitalize'>{post.category}</li>
                    <li><span className="text-gray-500 mx-2">/</span></li>
                    <li>{post.title}</li>
                </ol>
                </nav>
                
                <div className="md:w-10/12 w-full mx-auto flex items-center flex-col">
                    <div className="flex justify-center -mx-4 flex-wrap mt-6">
                        <PostMetaTitle
                        category={post.category}
                        date={post.updatedAt}
                        title={post.title}
                        slug={post.slug}
                        featured={post.featured}
                        content={post.content.json.children}
                        center
                        topics={post.topics}
                        />
                    </div>

                    <Image 
                        src={post.thumbnail.url} 
                        alt={post.title} 
                        width='500'
                        height='500'
                        blurDataURL={blurDataURL} 
                        placeholder='blur' 
                        className={`object-cover h-64 w-auto rounded mb-6 ${styles.handDrawnBorderImage}`} 
                        data-fade='2'
                        />
                </div>                
                <div className="md:w-10/12 w-full mx-auto" data-fade='3'>
                    <article className='content mx-auto' >
                    {isClient && (<RichText
                        content={post.content.json.children}
                        references={post.content.references}
                        renderers={{
                            h2: ({ children }) => <h2 className='m-0 mb-2'>{children}</h2>,
                            h3: ({ children }) => <h3 className='m-0'>{children}</h3>,
                            code: ({ children }) => <div className="bg-neutral-100 dark:bg-black rounded-md p-4 overflow-x-auto">
                            {children}
                            </div>,
                            Asset: {
                                image: ({ url, alt, caption, width, height, blurDataUrl }) => {
                                    return (
                                        <Image
                                            src={url}
                                            alt={alt}
                                            width={width}
                                            height={height}
                                            placeholder={blurDataUrl ? 'blur' : 'empty'}
                                            blurDataURL={blurDataUrl}
                                        />
                                    );
                                },
                            },
                        }}
                        // https://github.com/hygraph/rich-text/tree/main/packages/react-renderer
                        />
                    )}        
                    </article>

                    <ShareButtons post={post} />

                    <div className={prevTitle == post.title && nextTitle == post.title ? 'hidden' : 'flex justify-between'}>
                        <Link className='inline-flex items-center justify-between space-x-2 rounded py-2 mt-4' href={`/blog/${prevSlug}`}>
                            <BsChevronLeft className='hover:text-lime-500 stroke-1'/>
                            <div className='w-[100px] sm:w-[300px]'>
                                <div className='text-lime-500 dark:text-lime-500 font-semibold'>PREVIOUS</div> 
                                <div className='truncate'>{prevTitle}</div>
                            </div>
                        </Link>
                        <Link className='inline-flex items-center justify-between space-x-2  rounded py-2 mt-4 text-right' href={`/blog/${nextSlug}`}>
                            <div className='w-[100px] sm:w-[270px]'>
                                <div className='text-lime-500 dark:text-lime-500 font-semibold'>NEXT</div>
                                <div className='truncate'>{nextTitle}</div>
                            </div>
                            <BsChevronRight className='hover:text-lime-500 stroke-1'/>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
}

const getPlaiceholderBase64 = async (image_adress: string) => {
    const { base64 } = await getPlaiceholder(image_adress)
    return base64
}
// back here error
export async function getStaticProps({params}: GetStaticPropsContext<{ slug: string }>) {
    try {
    const { slug } = params as { slug: string };
    const post = await getPost(slug) || [] 
    const blurDataURL = await getPlaiceholderBase64(post.thumbnail.url)
    const posts = await getNextPrevPosts() || []
    
    const index = posts.findIndex(function(post:Post) {
        return post.slug === slug;
    });

    const len = posts.length
    let prevSlug = posts[(index+len-1)%len].slug;
    let prevTitle = posts[(index+len-1)%len].title;
    let nextSlug = posts[(index+1)%len].slug;    
    let nextTitle = posts[(index+1)%len].title;
    
    interface Asset {
        id: string;
        url: string;
        mimeType: string;
        width: number;
        height: number;
    }

    const images = post.content.references.filter((asset:Asset) =>
        asset.mimeType.includes('image')
    );

    await Promise.all(
        images.map(async (image:any) => {
            const { base64 } = await getPlaiceholder(image.url);
            image.blurDataUrl = base64;
        })
    );

    return {
        props: { post, blurDataURL, prevSlug, prevTitle, nextSlug, nextTitle }, revalidate: 120
    }
    } catch {
        return { notFound: true };
    }
}

export async function getStaticPaths() {
    const table = await getPosts().then((res: Post[]) => res);
    return {
        paths: table.map((row: Post) => ({
        params: {
            id: row.id,
            slug: row.slug,
        },
        })),
        fallback: "blocking",
    };
}