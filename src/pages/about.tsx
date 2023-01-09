import Image from "next/image";
import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import React from "react";
import styles from '@/styles/styles.module.css';
import { RichText } from '@graphcms/rich-text-react-renderer';
import {SiNextdotjs, SiGo, SiExpress, SiDocker, SiKubernetes, SiLaravel, SiBootstrap, SiNodedotjs, SiPostgresql, SiMysql, SiTailwindcss} from 'react-icons/si';
import Tippy from '@tippyjs/react/headless';

import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { getAbout } from "@/services";
import { getPlaiceholder } from "plaiceholder";

export default function About({about}:InferGetStaticPropsType<typeof getStaticProps>) {

    let skills = [ 
        {name:"Node.js", svg:<SiNodedotjs/>},
        {name:"Express", svg:<SiExpress/>},
        {name:"Next.js", svg:<SiNextdotjs/>},
        {name:"Laravel", svg:<SiLaravel/>},
        {name:"PostgreSQL", svg:<SiPostgresql/>},
        {name:"MySQL", svg:<SiMysql/>},
        {name:"Tailwind CSS", svg:<SiTailwindcss/>},
        {name:"Bootstrap", svg:<SiBootstrap/>},
        {name:"Docker", svg:<SiDocker/>},
        {name:"GoLang", svg:<SiGo/>}, 
        {name:"Kubernetes", svg:<SiKubernetes/>},
    ]

    return (
        <Layout>
            <Seo
            templateTitle='About'
            description='Amri Mufti is a web developer.'
            />

            <div className={`items-center md:items-start flex flex-col bg-white/50 p-6 rounded-xl shadow-lg dark:bg-black/30 dark:shadow-lime-700 !border-[2px] ${styles.handDrawnBorderHero}`} data-fade='0'>
                <h1 className="text-[42px] lg:text-6xl mb-6 sm:m-0 font-gochi tracking-[4px]" data-fade='1'>
                    <span className={`!inline ${styles.highlight}`}>Amri</span> Mufti
                </h1>

                <div className="flex flex-col md:flex-row-reverse items-center md:justify-between md:items-start mb-4">
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
                            data-fade='3'
                        />
                        <div className='flex' data-fade='4'>
                            <Link href='mailto:amrimuvti@gmail.com'  className="flex mx-auto items-center gap-2 btn-primary">
                                Let's collaborate!
                            </Link>
                        </div>
                    </div>

                    <div className="content mt-4 md:mt-0 md:text-left md:w-8/12 md:mr-6" data-fade='2'>
                        <RichText
                        content={about.content.json.children}
                        references={about.content.references}
                        // renderers={{
                        //     a: ({ children, href, openInNewTab }) => (
                        //         <a
                        //             href={href}
                        //             target={openInNewTab ? '_blank' : '_self'}
                        //             className='no-underline hover:underline text-lime-500 dark:text-lime-500'
                        //             rel="noreferrer"
                        //         >
                        //             {children}
                        //         </a>
                        //     ),
                        // }}
                        // already rendered by tailwind typography
                        />   
                    </div>
                </div>
                
            </div>

            <div className={`mt-8 bg-white/50 p-6 rounded-xl shadow-lg dark:bg-black/30 dark:shadow-lime-700 !border-[3px] ${styles.handDrawnBorderImage}`}>
                <div className="flex">
                <h3 className="mx-auto capitalize">tech stacks i use</h3>
                </div>
                <hr className="border-black/20 mx-auto mt-4 dark:border-white/20" />
                <div className="flex flex-wrap justify-center items-center gap-4 text-3xl sm:gap-8 sm:text-7xl my-4 " >
                    {skills.map((skill:{name:string; svg:JSX.Element}) => 
                    <Tippy 
                    placement="bottom"
                    delay={500}
                    render={attrs => (
                        <div className="dark:text-neutral-900 text-neutral-900 bg-lime-500 p-2 shadow-lg font-medium shadow-xl dark:shadow-lime-500/20"
                        {...attrs}
                        >
                            {skill.name}
                        </div>
                    )}>
                        <button>{skill.svg}</button>
                    </Tippy>
                    )}
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
            about: abouts.length > 0 ? abouts[0] : []
        },
        revalidate: 120
    }
}