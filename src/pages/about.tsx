import Image from "next/image";
import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from '@/styles/styles.module.css';
import { RichText } from '@graphcms/rich-text-react-renderer';
import {SiNextdotjs, SiGo, SiExpress, SiDocker, SiKubernetes, SiLaravel, SiBootstrap, SiNodedotjs, SiPostgresql, SiMysql, SiTailwindcss} from 'react-icons/si';
import {HiHeart} from 'react-icons/hi'

import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { getAbout } from "@/services";
import { getPlaiceholder } from "plaiceholder";

export default function About({about}:InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout>
            <Seo
            templateTitle='About'
            description='Amri Mufti is a web developer.'
            />

            <div className={`items-center md:items-start flex flex-col bg-white/50 p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorder}`} >
                <h1 className="text-[42px] lg:text-6xl mb-6 sm:m-0 font-gochi tracking-[4px]">
                    <span className={styles.highlight}>Amri</span> Mufti
                </h1>

                <div className="flex flex-col md:flex-row-reverse items-center md:justify-between md:items-start">
                    <div className="flex flex-col items-center">
                        <Image
                            src={about.image.url}
                            blurDataURL={about.blurDataURL}
                            placeholder='blur' 
                            alt="Profile"
                            priority={true}
                            className={`profile-image mb-6 ${styles.handDrawnBorderImage}`}
                            width='500'
                            height='500'
                        />
                        <Link href='mailto:amrimuvti@gmail.com' className=" flex mx-auto items-center gap-2 btn-primary" >
                        Let's collaborate
                        <i className="bi bi-envelope-at" style={{ fontSize: 18 }}></i>
                        </Link>
                        <div className="w-full sm:w-10/12 mt-6 flex flex-row gap-2 flex-wrap justify-center text-gray-600 dark:text-gray-400 text-sm sm:text-xl">
                            <HiHeart className="text-lime-500"/>
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

                    <div className="content mt-4 md:mt-0 text-gray-800 dark:text-white md:text-left md:w-8/12 md:mr-6">
                    <RichText
                    content={about.content.json.children}
                    references={about.content.references}
                    renderers={{
                        a: ({ children, href, openInNewTab }) => (
                            <a
                                href={href}
                                target={openInNewTab ? '_blank' : '_self'}
                                className='no-underline hover:underline text-lime-500 dark:text-lime-500'
                                rel="noreferrer"
                            >
                                {children}
                            </a>
                        ),
                    }}
                    />   
                    </div>
                </div>
                
            </div>
        </Layout>
    );
}


export async function getStaticProps() {
    const rawAbouts = await getAbout() || [] 
    const abouts = await Promise.all(
        rawAbouts.map(async (about:{image:{url:string}}) => {
            const { base64 } = await getPlaiceholder(about.image.url);
            return {
            ...about,
            blurDataURL: base64,
            };
        })
        ).then((values) => values);


    return {
        props: { 
            about: abouts.length > 0 ? abouts[0] : {} 
        },
        revalidate: 120
    }
}