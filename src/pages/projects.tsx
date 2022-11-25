import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import Seo from "../components/Seo";
import { getProjects, getTags } from "../../services";
import {  useEffect, useState } from "react";
import React from "react";

export default function Projects({projects, tags}:InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [filteredProjects, setFilteredProjects] = useState(() => [...projects])

    const [selectedFilters, setSelectedFilters] = useState('')

    useEffect(() => {
        const results = projects.filter(
            (project:any)  => {
                return (
                project.tags[0].name
                .includes(selectedFilters.toLowerCase()) ||
                selectedFilters
                    .toLowerCase()
                    .split(' ')
                    .some((selectedFilter) => project.tags.some((projectTag:any) => projectTag.name.toLowerCase() === selectedFilter)
                )); 
            }
        )
        setFilteredProjects(results);
    }, [projects, selectedFilters])

    const clearSelectedFilters = () => setSelectedFilters('');

    const toggleTag = (tag: string) => {
        if (selectedFilters.includes(tag)) {
            setSelectedFilters((s) =>
                s
                .split(' ')
                .filter((t) => t !== tag)
                ?.join(' ')
            );
        } else {
            setSelectedFilters((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
        }
        };

    const isTagged = (tag: string) => {
        return (
            selectedFilters.toLowerCase().split(' ').includes(tag)
        );
    };
    
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

        <div className="flex flex-wrap space-x-4 mt-6 items-center justify-start space-y-2">
                <span className=" text-sm text-neutral-600 dark:text-neutral-400">Filters:</span>
            {tags.map((tag:{name:string}, index:string) => (
                <button 
                    key={index}
                    onClick={() => toggleTag(tag.name.toLowerCase())}
                    className={isTagged(tag.name.toLowerCase()) ? "px-2 rounded-full bg-lime-500 text-neutral-100 dark:text-neutral-900 font-medium shadow-sm dark:shadow-lime-700" : "ring-1 ring-lime-500 px-2 rounded-3xl border-black dark:border-white"}
                >
                    {tag.name}
                </button>
            ))}
            <button
                onClick={() => clearSelectedFilters()}
                className='dark:bg-white bg-black hover:scale-[1.02] hover:shadow-md shadow dark:shadow-white/20 text-white duration-150 ease-in-out dark:text-black rounded-full px-4 py-2'
                >Reset all filters</button>
        </div>
        

        <div className="mt-4 flex flex-col gap-6">
        {filteredProjects.map((project:any) => (
                <div key={project.id} className="w-full">
                    <ProjectCard {...project}/>
                </div>
        ))}
        </div>
    </Layout>
    );
}

export async function getServerSideProps() {
    const projects = await getProjects() || [] 
    const tags = await getTags() 

    return {
        props: { projects, tags }
    }
}