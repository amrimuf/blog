import Image from "next/image";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from '../styles/styles.module.css';
import {SiNextdotjs, SiGo, SiExpress, SiDocker, SiKubernetes, SiLaravel, SiBootstrap, SiNodedotjs, SiPostgresql, SiMysql, SiTailwindcss} from 'react-icons/si';

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

            <div className={`items-center md:items-start flex flex-col bg-white/50 p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorder}`} >
                <h1 className={`text-[42px] font-bold lg:text-6xl text-neutral-900 dark:text-neutral-100 mb-6 sm:m-0 font-gochi tracking-[4px] ${styles.highlight}`}>
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
                            className={`profile-image mb-6 ${styles.handDrawnBorderImage}`}
                            width={250}
                            height={250}
                        />
                        <Link href='mailto:amrimuvti@gmail.com' className=" flex mx-auto items-center gap-2 btn-primary" >
                        <p>Let's collaborate</p>
                        <i className="bi bi-envelope-at" style={{ fontSize: 18 }}></i>
                        </Link>
                        <div className="w-full sm:w-10/12 mt-6 flex flex-row gap-2 flex-wrap justify-center text-gray-600 dark:text-gray-400 text-sm sm:text-xl">
                            <SiGo/>
                            <SiNodedotjs/>
                            <SiExpress/>
                            <SiDocker/>
                            <SiKubernetes/>
                            <SiPostgresql/>
                            <SiMysql/>
                            <SiLaravel />
                            <SiNextdotjs/>
                            <SiTailwindcss />
                            <SiBootstrap/>
                        </div>
                    </div>

                    <div className="content mt-4 md:mt-0 text-gray-800 dark:text-white md:text-left md:w-8/12 md:mr-6" dangerouslySetInnerHTML={{ __html: content }}></div>
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