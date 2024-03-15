import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { RichText } from '@graphcms/rich-text-react-renderer';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { renderToString } from 'react-dom/server';
import Layout from '@/components/Layout';
import PostMetaTitle from '@/components/PostMetaTitle';
import Seo from '@/components/Seo';
import { getPost, getNextPrevPosts, getPosts } from '@/services';
import Link from 'next/link';
import styles from '@/styles/styles.module.css'
import { getPlaiceholder } from 'plaiceholder';
import { Asset, ImageType, Post } from '@/lib/types';
import { BsChevronLeft, BsChevronRight, BsArrowLeft } from 'react-icons/bs';
import ShareButtons from '@/components/Share';
import clsx from 'clsx';

import Prism from 'prismjs';
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-go";
import "prismjs/components/prism-python"
import "prismjs/components/prism-php"
import "prismjs/components/prism-cshtml"
import "prismjs/components/prism-json"
import "prismjs/components/prism-java"
import "prismjs/components/prism-rust"
import 'prismjs/components/prism-markup-templating';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import Breadcrumb from '@/components/Breadcrumb';
import ScrollToAnchor from '@/components/ScrollToAnchor';

export default function Detail({ post, blurDataURL, prevSlug, prevTitle, nextSlug, nextTitle, tOC }:InferGetStaticPropsType<typeof getStaticProps>) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    useEffect(() => {
        if (isClient) {
            const highlight = async () => {
                await Prism.highlightAll();
            };
            highlight();
        }
    }, [isClient]);     

    const prevUrl = post.isBlog != false ? 'blog' : 'projects'
    // const breadcrumbs = [
    //     { title: 'Home', href: '/' },
    //     { title: prevUrl, href: `/${prevUrl}` },
    //     { title: post.category },
    //     { title: post.title },
    // ];

        return (
            <Layout>
                <Seo
                templateTitle={post.title}
                description={post.headline}
                isBlog
                banner={post.thumbnail.url}
                />
                {/* <Breadcrumb items={breadcrumbs} /> */}
                <div className='flex relative z-10 justify-between md:w-10/12 mx-auto gap-y-4 flex-wrap' data-fade='0'>
                    <Link href={`/${prevUrl}`}>
                        <button className='btn-secondary flex gap-2 items-center'>
                            <BsArrowLeft/>
                            <span className='hidden sm:block'>back to {prevUrl}</span>
                        </button></Link>
                    <ShareButtons post={post} />
                </div> 
                
                <div className="md:w-10/12 w-full mx-auto flex items-center flex-col relative">
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
                        width={post.thumbnail.width}
                        height={post.thumbnail.height}
                        blurDataURL={blurDataURL} 
                        placeholder='blur' 
                        className={clsx(post.isBlog ? 'content-image' : 'max-h-40 sm:max-h-64 w-auto', 'mb-6', styles.handDrawnBorderImage)} 
                        data-fade='2'
                        />
                </div>               
                <div className="md:w-10/12 w-full mx-auto" data-fade='3'>
                    <article className='content mx-auto' >
                        
                    <ScrollToAnchor isClient={isClient}/>
                    <div className={tOC.length > 0 ? "bg-lime-50 dark:bg-black/20 p-4 mb-6 rounded-md" : "hidden"}>
                        <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
                        <ul >
                        {tOC.map((item, index) => (
                            // back here: handle other headings
                            <li key={index} className={clsx(item.type == 'heading-two' ? '-ml-6' : 'ml-2', 'list-none')}>
                                <Link
                                    href={`#${item.slug}`}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* trick hydration err */}
                    {isClient && (<RichText
                        content={post.content.json.children}
                        references={post.content.references}
                        renderers={{
                            h1: ({children}) => {return <h1 id={renderToString(<>{children}</>).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} >{children}</h1>},
                            h2: ({children}) => {return <h2 id={renderToString(<>{children}</>).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} >{children}</h2>},
                            h3: ({children}) => {return <h3 id={renderToString(<>{children}</>).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} >{children}</h3>},
                            // back here: add dynamic language
                            code_block: ({ children }) => {
                                const lang = renderToString(<>{children}</>).substring(renderToString(<>{children}</>).indexOf('#') + 1).split(/\s+/)[0]
                                const excludedRegex = new RegExp(`^.*${`#${lang}`}.*$`, 'gm'); // Create a regular expression to match the entire line containing the exclusion string
                                const lines = renderToString(<>{children}</>).split('\n'); // Split the string into lines
                                const filteredLines = lines.filter(line => !excludedRegex.test(line)); // Filter out lines containing the exclusion string
                                const result = filteredLines.join('\n'); // Join the remaining lines back together
                                return (
                                    <pre className={`line-numbers`}>
                                        <code className={clsx('language' + '-' + lang)}><div dangerouslySetInnerHTML={{ __html: result }} /></code>
                                    </pre>
                                );
                            },
                            Asset: {
                                image: ({ url, alt, caption, width, height, blurDataUrl, fileName }) => {
                                    return (
                                        <Image
                                            src={url}
                                            alt={fileName}
                                            width={width}
                                            height={height}
                                            placeholder={blurDataUrl ? 'blur' : 'empty'}
                                            blurDataURL={blurDataUrl}
                                            className={`content-image ${styles.handDrawnBorderImage}`} 
                                        />
                                    );
                                },
                            },
                            // back here: style embed post
                            embed: {
                                Post: ({ title, headline, slug }) => {
                                    return (
                                    <div className={clsx(styles.handDrawnBorderProjects, 'p-4 mb-6')}>
                                        <h3><Link href={slug}>{title}</Link></h3>
                                        <p>{headline}</p>
                                    </div>
                                    );
                                },
                                },
                        }}
                        // check out tailwind.config.js (dark) and global.css (light)
                        // https://github.com/hygraph/rich-text/tree/main/packages/react-renderer
                        />
                    )}       
                    </article>

                    <div className={prevTitle == post.title && nextTitle == post.title ? 'hidden' : 'flex flex-wrap justify-between'}>
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

    interface tOCItem {
        type: string;
        slug: string;
        text: string;
    }

    interface ContentItem {
        type: string;
        children: { text: string }[];
    }

    const tOC: tOCItem[] = [];
    post.content.json.children.forEach((c: ContentItem) => {
        if (c.type.includes('heading')) {
            const type = c.type
            const text = c.children[0].text;
            const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            tOC.push({ type, slug, text });
        }
    });
    
    const len = posts.length
    let prevSlug = posts[(index+len-1)%len].slug;
    let prevTitle = posts[(index+len-1)%len].title;
    let nextSlug = posts[(index+1)%len].slug;    
    let nextTitle = posts[(index+1)%len].title;

    const images = post.content.references.filter((asset:Asset) =>
        asset.mimeType && asset.mimeType.includes('image')
    );

    await Promise.all(
        images.map(async (image:ImageType) => {
            const { base64 } = await getPlaiceholder(image.url);
            image.blurDataUrl = base64;
        })
    );

    return {
        props: { post, blurDataURL, prevSlug, prevTitle, nextSlug, nextTitle, tOC }, revalidate: 120
    }
    } catch (error){
        console.log(error)
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