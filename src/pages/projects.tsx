import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import Seo from "../components/Seo";
import { getProjects, getTags } from "../../services";
import {  useEffect, useState } from "react";
import React from "react";

export default function Projects({projects, tags}:InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [filteredProjects, setFilteredProjects] = useState(() => [...projects])

    // const [filterField, setFilterField] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('')

    const handleSelectedFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilter(e.target.value);
    };
    const clearSelectedFilter = () => setSelectedFilter('');

    const toggleTag = (tag: string) => {
        // If tag is already there, then remove
        if (selectedFilter.includes(tag)) {
            setSelectedFilter((s) =>
            s
                .split(' ')
                .filter((t) => t !== tag)
                ?.join(' ')
            );
        } else {
            // append tag
            setSelectedFilter((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
        }
        };

    useEffect(() => {
        const results = projects.filter(
            (project:any)  => {
                return (
                // project.tags.map((tag:any) => (tag.name))
                project.tags[0].name
                .includes(selectedFilter.toLowerCase()) ||
                // project.tags
                // .some((tag:any) => tag.name === selectedFilter) ||
                // Check if splitted search contained in tag
                selectedFilter
                    .toLowerCase()
                    .split(' ')
                    .some((tagf) => project.tags.some((tag:any) => tag.name === tagf)
                )); 
            }
        )
        setFilteredProjects(results);
    }, [projects, selectedFilter])

    const checkTagged = (tag: string) => {
        return (
            selectedFilter.toLowerCase().split(' ').includes(tag)
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
        <input
            className='hidden'
            placeholder='Search...'
            onChange={handleSelectedFilter}
            value={selectedFilter}
            type='text'
        />
        
        <div className="flex flex-wrap space-x-4 mt-6 items-center justify-start space-y-2">
                <span className=" text-sm text-neutral-600 dark:text-neutral-400">Filters:</span>
            {tags.map((tag:any, index:any) => (
                <button 
                    key={index}
                    onClick={() => toggleTag(tag.name)}
                    className={checkTagged(tag.name) ? "border-2 border px-2 rounded-3xl border-lime-500 bg-lime-500 text-neutral-100 dark:text-neutral-900 font-medium shadow-md dark:shadow-lime-700" : "ring-1 ring-lime-500 px-2 rounded-3xl border-black dark:border-white"}
                >
                    {tag.name}
                </button>
            ))}
            <button
                onClick={() => clearSelectedFilter()}
                className='dark:bg-white bg-black hover:scale-[1.02] hover:shadow-lg shadow-md dark:shadow-white/20 text-white dark:text-black rounded-full px-4 py-2'
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