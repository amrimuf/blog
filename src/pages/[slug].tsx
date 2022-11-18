import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';

import Layout from '../components/Layout';
import PostMetaTitle from '../components/PostMetaTitle';
import Seo from '../components/Seo';
import { getPost } from '../../services';
import Link from 'next/link';

type Post = {
    post: {
        title: string,
        category:string,
        createdAt:string,
        slug:string,
        headline:string,
        isBlog:boolean,
        content: {
            html:string
        }
        thumbnail: {
            url:string
        }
    },
}

export default function Detail({ post }: Post) {
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

    const url = post.isBlog != false ? 'blog' : 'projects'

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
                <div className='wysiwyg lg:wysiwyg-xl dark:wysiwyg-dark' dangerouslySetInnerHTML={{ __html: content }}></div>
                
                <Link className='inline-flex items-center justify- space-x-2 text-sm lg:text-lg font-semibold rounded px-4 py-2 mt-4 border border-2 border-gray-400 rounded dark:border-white-300 dark:hover:border-white hover:border-gray-600 mt-12' href={`/${url}`}>
                <i className='bi bi-arrow-left'></i>
                <p>Back to {url}</p>
            </Link>
            </div>
        </Layout>
    );
}
}

export async function getServerSideProps({params}:any) {
    const post = await getPost(params.slug) || [] 
    return {
        props: { post }
    }
}