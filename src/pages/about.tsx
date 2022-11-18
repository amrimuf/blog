import Image from "next/image";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { getAbout } from "../../services";

export default function About({about}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const newImageSrc = about.image.url.toString().replace(/[()]/g, '');
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
    const content = about.content.html

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
            templateTitle='About'
            description='Amri Mufti is a web developer.'
            />

            <div className="items-center md:items-start lg:-mx-4 flex text-center flex-col" >
                <h1 className="underline underline-offset-8 decoration-2 decoration-sky-500 text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white mb-6">
                    {about.title}
                </h1>

                <div className="flex flex-col md:flex-row-reverse items-center md:justify-between md:items-start">
                    <div className="flex flex-col items-center">
                        <Image
                            src={newImageSrc}
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`}
                            placeholder='blur' 
                            alt="Profile"
                            priority={true}
                            className="sm:block border-2 rounded-lg border-sky-500 p-3 mb-6"
                            width={250}
                            height={250}
                            // placeholder="blur"
                        />
                        <Link href='mailto:amrimuvti@gmail.com' className="w-8/12 flex items-center justify-center space-x-2  py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" >
                        <p>Let's collaborate</p>
                        <i className="bi bi-envelope-at" style={{ fontSize: 18 }}></i>
                        </Link>
                    </div>
                    <div className="mt-6 md:mt-0 text-gray-800 dark:text-white md:text-left md:w-8/12 sm:mr-6">
                        <div className="wysiwyg lg:wysiwyg-xl dark:wysiwyg-dark" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                </div>
                
            </div>
            <style>
            {`
                .link {
                    font-weight:normal;
                }
                .link:hover {
                    color:#2563eb;
                }
            `}
            </style>
        </Layout>
    );
}
}

export async function getServerSideProps() {
    const abouts = await getAbout() || [] 

    return {
        props: { 
            about: abouts.length > 0 ? abouts[0] : {} 
        }
    }
}