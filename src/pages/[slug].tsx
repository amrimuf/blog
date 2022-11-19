import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';

import Layout from '../components/Layout';
import PostMetaTitle from '../components/PostMetaTitle';
import Seo from '../components/Seo';
import { getPost, getPosts } from '../../services';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';

export default function Detail({ post, prevSlug, prevTitle, nextSlug, nextTitle }:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const newImageSrc = post.thumbnail.url.toString().replace(/[()]/g, '');
    const convertImage = (w:number, h:number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
        <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
        </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`;

        const toBase64 = (str:string) =>
        typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);

    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
    const content = post.content.html

    const prevUrl = post.isBlog != false ? 'blog' : 'projects'

    React.useEffect(() => {
		// Updating a state causes a re-render
		setInitialRenderComplete(true);
	}, []);
    if (!initialRenderComplete) {
		// Returning null will prevent the component from rendering, so the content will simply be missing from
		// the server HTML and also wont render during the first client-side render.
		return null;
	} else {

    return (
        <Layout>
            <Seo
            templateTitle={post.title}
            description={post.headline}
            />

            <nav className="lg:w-10/12 mx-auto rounded-full hidden md:block bg-gray-100/80 px-2 py-1 dark:bg-gray-900/40 dark:text-gray-100">
            <ol className="list-reset flex">
                <li><Link href="/" className="text-sky-500 hover:font-semibold ">Home</Link></li>
                <li><span className="text-gray-500 mx-2 ">/</span></li>
                <li><Link href={`/${prevUrl}`} className="text-sky-500 hover:font-semibold capitalize">{prevUrl}</Link></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500 dark:text-gray-400">{post.title}</li>
            </ol>
            </nav>
            
            <div className="md:w-10/12 w-full mx-auto flex items-center flex-col">
                <div className="flex justify-center -mx-4 flex-wrap mt-6">
                    <PostMetaTitle
                    category={post.category}
                    date={post.createdAt}
                    title={post.title}
                    slug={post.slug}
                    center
                    />
                </div>

                <Image src={newImageSrc} alt={post.title} width={500} height={500} blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`} placeholder='blur' className="object-contain h-64 w-full rounded mb-6" />
            
            </div>
            <div className="lg:w-10/12 w-full mx-auto leading-relaxed">
                <div className='wysiwyg lg:wysiwyg-xl dark:wysiwyg-dark  mx-auto' dangerouslySetInnerHTML={{ __html: content }}></div>
                
                <div className='flex justify-between'>
                    <Link className='inline-flex items-center justify-between space-x-2 text-sm lg:text-lg font-semibold rounded py-2 mt-4 mt-12' href={`/${prevSlug}`}>
                        <i className='bi bi-chevron-left hover:text-sky-500 bi-hover-bold' ></i>
                        <div className='w-[100px] sm:w-[300px]'>
                            <div className='text-sky-500'>PREVIOUS</div> 
                            <div className='truncate text-black/60 dark:text-white/60 '>{prevTitle}</div>
                        </div>
                    </Link>
                    <Link className='inline-flex items-center justify-between space-x-2 text-sm lg:text-lg font-semibold rounded py-2 mt-4 mt-12 text-right' href={`/${nextSlug}`}>
                        <div className='w-[100px] sm:w-[300px]'>
                            <div className='text-sky-500'>NEXT</div>
                            <div className='truncate text-black/60 dark:text-white/60'>{nextTitle}</div>
                        </div>
                        <i className='bi bi-chevron-right hover:text-sky-500  bi-hover-bold'></i>
                    </Link>
                </div>
            </div>
            <style>{`
                .bi-hover-bold:hover {
                    -webkit-text-stroke: 1px;
                }
            `}</style>
        </Layout>
    );
}
}

export async function getServerSideProps({params}:any) {
    const post = await getPost(params.slug) || [] 
    const posts = await getPosts()

    const index = posts.findIndex(function(post:any) {
        return post.slug === params.slug;
    });

    const len = posts.length
    let prevSlug = posts[(index+len-1)%len].slug;
    let prevTitle = posts[(index+len-1)%len].title;
    let nextSlug = posts[(index+1)%len].slug;    
    let nextTitle = posts[(index+1)%len].title;    

    return {
        props: { post, prevSlug, prevTitle, nextSlug, nextTitle }
    }
}