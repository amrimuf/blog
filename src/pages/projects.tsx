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
        description="Some of the cool projects I\'ve been tinkering with lately!"
        />
        <h1 data-fade='0'>
            Projects
        </h1>
        <p className='mt-2' data-fade='1'>
        Some of the cool projects I've been tinkering with lately!
        </p>

        <div className={`${filteredProjects.length > 0 ? "flex flex-wrap gap-2 mt-6 items-center justify-center sm:justify-start" : 'hidden'}`} data-fade='3'>
                {tags.sort().map((tag:string, index:number) => (
                    <button 
                        key={index}
                        onClick={() => handleToggleTag(tag)}
                        className={selectedFilters.includes(tag) ? "label-selected" : "label"}
                    >
                        {tag}
                    </button>
                ))}
            <button
                onClick={() => handleClear()}
                className='btn-primary'
                >Show All projects</button>
        </div>
        
        {filteredProjects.length > 0 ? 
            <div className="mt-4 grid sm:grid-cols-2 gap-6" data-fade='4'>
                {filteredProjects.map((project:Project) => (
                    <ProjectCard key={project.id} {...project}/>
                ))}
            </div>
            : <p className="font-semibold !text-lime-500 text-lg mt-6" data-fade='4'>My first project - coming soon!</p>
        }
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