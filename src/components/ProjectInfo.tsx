import { BsBoxArrowUpRight } from 'react-icons/bs'

import styles from '@/styles/styles.module.css'
import { Project } from "@/lib/types";

export default function ProjectInfo({...projectInfo}: Project) {
    return (
        <div className='w-full md:w-10/12 flex flex-col space-y-2 py-6'>
            <h3>{projectInfo.title}</h3>
            {projectInfo.post || projectInfo.nolink ?  
            <BsBoxArrowUpRight className='text-base sm:text-lg absolute right-5 top-5 ml-4' />
            : ''}
            <hr className="border-black/20 w-full mx-auto mt-10 md:hidden dark:border-white/20" />
            <p>{projectInfo.description}</p>
            <div className="flex flex-wrap justify-start gap-2">
                {projectInfo.tags.map((tag:{name:string},index:number) => 
                <div 
                    key={index} 
                    className="ring-1 ring-lime-500 italic px-2 rounded-full mt-2">{tag.name}
                </div>)}
            </div>
        </div>
    );
}