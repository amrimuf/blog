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
                <h1 className='font-bold text-3xl text-gray-900 dark:text-gray-100'>{projectInfo.title}</h1>
            </div>
            <hr className="border-black/20 w-full mx-auto mt-10 md:hidden dark:border-white/20" />
            <div className="text-gray-600 dark:text-gray-400">
                {projectInfo.description}
            </div>
            <div className="flex flex-wrap justify-start gap-2 text-gray-900 dark:text-gray-100">
                {projectInfo.tags.map((tech:any,index:any) => <div key={index} className="ring-1 ring-lime-500 italic border px-2 rounded-3xl ">{tech.name}</div>)}
            </div>
        </div>
    );
}