import Image from "next/image";
import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import React from "react";
import styles from '@/styles/styles.module.css';
import { RichText } from '@graphcms/rich-text-react-renderer';
import {SiGithub} from 'react-icons/si';

import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { getAbout } from "@/services";
import { getPlaiceholder } from "plaiceholder";
import RunningText from "@/components/RunningText";

export default function About({about}:InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <Layout>
            <Seo
            templateTitle='About'
            description='Amri Mufti is a web developer.'
            />

            <div className='items-center md:items-start flex flex-col' data-fade='0'>
                <h1 className="text-[42px] lg:text-6xl mb-6 font-gochi tracking-[4px]" data-fade='1'>
                    <span className={`!inline ${styles.highlight}`}>Amri</span> Mufti
                </h1>

                {/* back here: change layout */}
                <div data-fade='4'>
                    <div className="md:float-right flex flex-col items-center md:ml-6 md:mb-16 mb-20 relative">
                        <Image
                            src={about.image.url}
                            blurDataURL={about.blurDataURL}
                            alt="Profile"
                            priority={true}
                            className={`profile-image ${styles.handDrawnBorderImage}`}
                            width={about.image.width}
                            height={about.image.height}
                            data-fade='3'
                        />
                        <div className='absolute -bottom-14 flex items-center gap-3' data-fade='4'>
                            <Link href='mailto:amrimuvti@gmail.com'  className="flex mx-auto items-center gap-2 btn-primary">
                                Contact me
                            </Link>
                            <Link href='https://github.com/amrimuf' className="btn-secondary !p-1 !border-lime-500" target='_blank' rel="noreferrer noopener">
                                <SiGithub className="text-2xl"/>
                            </Link>                            
                        </div>
                    </div>

                    <RichText
                    content={about.content.json.children}
                    references={about.content.references}
                    // already rendered by tailwind typography
                    />   
                </div>
                {/* <RunningText/> */}
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