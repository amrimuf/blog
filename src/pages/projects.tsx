import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import Seo from "../components/Seo";
import { getProjects } from "../../services";

export default function projects({projects}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
    <Layout>
        <Seo
        templateTitle='Projects'
        description='A few projects I have worked on recently.'
        />
        <h1 className='text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white' data-fade='0'>
            Projects
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300' data-fade='1'>
            A few projects I have worked on recently.
        </p>
        <div className="mt-6  flex flex-col space-y-4">
        {projects.map((project:any) => (
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

    return {
        props: { projects }
    }
}