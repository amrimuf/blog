import Image from "next/image";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { getAbout } from "../../services";

export default function About({about}:InferGetServerSidePropsType<typeof getServerSideProps>) {

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

            <div className="items-center md:items-start flex flex-col bg-white p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black dark:shadow-lime-700" >
                <h1 className="underline underline-offset-8 decoration-2 decoration-lime-500 text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white mb-6">
                    {about.title}
                </h1>

                <div className="flex flex-col md:flex-row-reverse items-center md:justify-between md:items-start">
                    <div className="flex flex-col items-center">
                        <Image
                            src={about.image.url}
                            blurDataURL={`/_next/image?url=${about.image.url}&w=16&q=1`}
                            placeholder='blur' 
                            alt="Profile"
                            priority={true}
                            className="ring-1 ring-lime-500 rounded-md border border-lime-500 shadow-md dark:shadow-lime-700 p-3 mb-6"
                            width={250}
                            height={250}
                        />
                        <Link href='mailto:amrimuvti@gmail.com' className="w-8/12 flex items-center justify-center space-x-2  py-2.5 bg-lime-500 text-white dark:text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md dark:shadow-lime-700 hover:scale-[1.02] hover:shadow-lg transition duration-150 ease-in-outt" >
                        <p>Let's collaborate</p>
                        <i className="bi bi-envelope-at" style={{ fontSize: 18 }}></i>
                        </Link>
                    </div>

                    <div className="wysiwyg md:wysiwyg-lg lg:wysiwyg-xl  dark:wysiwyg-dark mt-6 md:mt-0 text-gray-800 dark:text-white md:text-left md:w-8/12 md:mr-6" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                
            </div>
            <style>
            {`
                .link {
                    font-weight:normal;
                }
                .link:hover {
                    color:#84cc16;
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