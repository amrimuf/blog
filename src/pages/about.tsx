import Image from "next/image";
import { getAbout } from "../../services";
import { InferGetServerSidePropsType } from "next";
import React from "react";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

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
            description='Thoughts, mental models, and tutorials about front-end development. Rebuild your mental model so front-end development can be predictable.'
            />

            <div className="items-center md:items-start lg:-mx-4 flex text-center flex-col" >
                <h1 className="underline underline-offset-8 decoration-2 decoration-sky-500 text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white mb-6">
                    {about.title}
                </h1>

                <div className="flex flex-col md:flex-row-reverse items-center md:justify-between md:items-start">
                    <Image
                        src={about.image.url}
                        alt="Profile"
                        priority={true}
                        className="sm:block border-2 rounded-lg border-sky-500 p-3"
                        width={250}
                        height={250}
                        // placeholder="blur"
                    />
                    <div className="mt-6 md:mt-0 text-gray-800 dark:text-white md:text-left md:w-8/12 sm:mr-6">
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                </div>

            </div>
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