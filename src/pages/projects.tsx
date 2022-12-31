import { InferGetServerSidePropsType } from "next";
import {  useEffect, useState } from "react";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import Seo from "../components/Seo";
import styles from '../styles/styles.module.css'
import { getProjects, getTags } from "../../services";

export default function Projects({ tags }:InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [projects, setProjects] = useState<string[]>([])
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchProjects = async () => {
        setIsLoading(true)
        const data = await getProjects(selectedFilters.length !== 0 ? selectedFilters : tags)
        setIsLoading(false)
        setProjects(data)
    }

    const handleToggleTag = (tag: string) => {        
        // select/unselect filter
        selectedFilters.includes(tag) ? selectedFilters.splice(selectedFilters.indexOf(tag), 1) : selectedFilters.push(tag)

        fetchProjects()
    };

    useEffect(() => {
        if (selectedFilters.length == 0) {
            fetchProjects()
        }
    }, [selectedFilters])

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
                {tags.sort().map((tag:any, index:any) => (
                    <button 
                        key={index}
                        onClick={() => handleToggleTag(tag)}
                        className={selectedFilters.includes(tag) ? "px-2 rounded-full bg-lime-500 text-neutral-100 dark:text-neutral-900 font-medium shadow-sm dark:shadow-lime-700" : "ring-1 ring-lime-500 px-2 rounded-3xl border-black dark:border-white"}
                    >
                        {tag}
                    </button>
                ))}
            <button
                onClick={() => setSelectedFilters([])}
                className='dark:bg-white bg-black hover:scale-[1.02] hover:shadow-md shadow dark:shadow-white/20 text-white duration-150 ease-in-out dark:text-black rounded-full px-4 py-2'
                >Reset all filters</button>
        </div>
        

        <div className="mt-4 grid sm:grid-cols-2 gap-6">
            {isLoading ? <span>Loading...</span> : projects.map((project:any) => (
                    <div key={project.id} className={`bg-white/60 dark:bg-black/30 shadow-md dark:sahdow-lime-700 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 dark:shadow-lime-700 ${styles.handDrawnBorderProjects}`}>
                        <ProjectCard {...project}/>
                    </div>
            ))}
        </div>
    </Layout>
    );
}

export async function getServerSideProps(req:any) {
    const tagsObj = await getTags() 
    const tags: string[] = []
    tagsObj.map((tag: {name: string}) => tags.push(tag.name))
    
    return {
        props: { tags }
    }
}