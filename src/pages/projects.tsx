import { InferGetStaticPropsType } from "next";
import {  useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import Seo from "@/components/Seo";
import { getProjects, getTags } from "@/services";
import { getPlaiceholder } from "plaiceholder";
import { Project } from "@/lib/types";

export default function Projects({ tags, projects }:InferGetStaticPropsType<typeof getStaticProps>) {

    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleToggleTag = (tag: string) => { 
        const fetchProjects = async () => {
            const data =  projects.filter(
                (project:Project)  => {
                    return (
                    selectedFilters
                        .some((selectedFilter) => project.tags.some((tag:{name:string}) => tag.name.toLowerCase() === selectedFilter.toLowerCase())
                    )); 
                }
            )
            setFilteredProjects(data)
        }
        
        // select/unselect filter
        selectedFilters.includes(tag) ? selectedFilters.splice(selectedFilters.indexOf(tag), 1) : selectedFilters.push(tag)

        selectedFilters.length !== 0 ? fetchProjects() : setFilteredProjects(projects)
    };

    const handleClear = () => {
        setFilteredProjects(projects)
        setSelectedFilters([])
    }

    return (
    <Layout>
        <Seo
        templateTitle='Projects'
        description='A few projects I have worked on recently.'
        />
        <h1 data-fade='0'>
            Projects
        </h1>
        <p className='mt-2' data-fade='1'>
            A few projects I have worked on recently.
        </p>

        <div className="flex flex-wrap gap-2 mt-6 items-center justify-center sm:justify-start space-y-2" data-fade='3'>
                <span className="hidden sm:block">Filters:</span>
                {tags.sort().map((tag:string, index:number) => (
                    <button 
                        key={index}
                        onClick={() => handleToggleTag(tag)}
                        className={selectedFilters.includes(tag) ? "px-2 rounded-full bg-lime-500 text-neutral-100 dark:text-neutral-900 font-medium shadow-sm dark:shadow-lime-700" : "ring-1 ring-lime-500 px-2 rounded-3xl border-black dark:border-white"}
                    >
                        {tag}
                    </button>
                ))}
            <button
                onClick={() => handleClear()}
                className='dark:bg-neutral-50 bg-neutral-900 hover:scale-[1.02] hover:shadow-md shadow dark:shadow-white/20 text-white duration-150 ease-in-out dark:text-neutral-900 text-neutral-50 rounded-full px-4 py-2'
                >Reset all filters</button>
        </div>
        

        <div className="mt-4 grid sm:grid-cols-2 gap-6" data-fade='4'>
            {filteredProjects.map((project:Project) => (
                <ProjectCard key={project.id} {...project}/>
            ))}
        </div>
    </Layout>
    );
}

export async function getStaticProps() {
    const tagsAsObject = await getTags() 
    const tags: string[] = []
    tagsAsObject.map((tag: {name: string}) => tags.push(tag.name))

    const rawProjects = await getProjects()
    const projects = await Promise.all(
        rawProjects.map(async (project:Project) => {
            const { base64 } = await getPlaiceholder(project.thumbnail.url);
            return {
            ...project,
            blurDataURL: base64,
            };
        })
    )

    return {
        props: { tags, projects }, revalidate: 120
    }
}