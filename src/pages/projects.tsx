import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import Seo from "../components/Seo";
import { getProjects, getTags } from "../../services";
import {  useEffect, useState } from "react";
import React from "react";
import styles from '../styles/styles.module.css'
import { useRouter } from "next/router";

export default function Projects({ tags }:InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [filteredProjects, setFilteredProjects] = useState<string[]>([])
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const toggleTag = (tag: string) => {
        const tagsArr: string[] = selectedFilters
        const projects = async () => {
            const data = await getProjects(tagsArr)
            setFilteredProjects(data)
        }
        
        tagsArr.includes(tag) ? tagsArr.splice(tagsArr.indexOf(tag), 1) : tagsArr.push(tag)
        projects()
        setSelectedFilters(tagsArr)
    };

    const isTagged = (tag: string) => {
        return (
            selectedFilters.includes(tag)
        );
    };

    const handleClear = () => {
        setSelectedFilters([]);
    }
    
    useEffect(() => {
        if (selectedFilters.length == 0) {
            const projects = async () => {
                const data = await getProjects(tags)
                setFilteredProjects(data)
            }
            projects()
        }
    })

    return (
    <Layout>
        <Seo
        templateTitle='Projects'
        description='A few projects I have worked on recently.'
        />
        <h1 className='text-2xl font-bold lg:text-5xl text-neutral-900 dark:text-neutral-100' data-fade='0'>
            Projects
        </h1>
        <p className='mt-2 text-neutral-600 dark:text-neutral-400' data-fade='1'>
            A few projects I have worked on recently.
        </p>

        <div className="flex flex-wrap gap-2 mt-6 items-center justify-center sm:justify-start space-y-2">
                <span className="hidden sm:block text-sm text-neutral-600 dark:text-neutral-400">Filters:</span>
            {tags.sort().map((tag:any) => (
                <button 
                    onClick={() => toggleTag(tag)}
                    className={isTagged(tag) ? "px-2 rounded-full bg-lime-500 text-neutral-100 dark:text-neutral-900 font-medium shadow-sm dark:shadow-lime-700" : "ring-1 ring-lime-500 px-2 rounded-3xl border-black dark:border-white"}
                >
                    {tag}
                </button>
            ))}
            <button
                onClick={() => handleClear()}
                className='dark:bg-white bg-black hover:scale-[1.02] hover:shadow-md shadow dark:shadow-white/20 text-white duration-150 ease-in-out dark:text-black rounded-full px-4 py-2'
                >Reset all filters</button>
        </div>
        

        <div className="mt-4 grid sm:grid-cols-2 gap-6">
        {filteredProjects.map((project:any) => (
                <div key={project.id} className={`bg-white/60 dark:bg-black/30 shadow-md dark:sahdow-lime-700 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 dark:shadow-lime-700 ${styles.handDrawnBorderProjects}`}>
                    <ProjectCard {...project}/>
                </div>
        ))}
        </div>
    </Layout>
    );
}

export async function getServerSideProps(req:any) {
    const fetchTags = await getTags() 
    const tags: any[] = []
    fetchTags.map((tag:any) => tags.push(tag.name))
    
    return {
        props: { tags }
    }
}