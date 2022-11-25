type ProjectInfoType = {
    category: string;
    createdAt: string;
    title: string;
    headline: string;
    slug: string;
    author: string;
    description:string;
    tags: string[]
    post: {
        slug: string
    }
    thumbnail: {
        url:string
    }
};

export default function ProjectInfo({...projectInfo}: ProjectInfoType) {
    return (
        <div className='w-full md:w-10/12 flex flex-col space-y-2 py-6'>
            <div className="">
                <h1 className='font-bold text-3xl text-neutral-900 dark:text-neutral-100'>{projectInfo.title}</h1>
            </div>
            <hr className="border-black/20 w-full mx-auto mt-10 md:hidden dark:border-white/20" />
            <div className="text-neutral-600 dark:text-neutral-400">
                {projectInfo.description}
            </div>
            <div className="flex flex-wrap justify-start gap-2 text-neutral-900 dark:text-neutral-100">
                {projectInfo.tags.map((tag:any,index:any) => <div key={index} className="ring-1 ring-lime-500 italic border px-2 rounded-3xl ">{tag.name}</div>)}
            </div>
        </div>
    );
}