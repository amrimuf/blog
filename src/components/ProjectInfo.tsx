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
                <h1 className='font-bold text-3xl dark:text-white'>{projectInfo.title}</h1>
            </div>
            <div>
                {projectInfo.description}
            </div>
            <div className="flex flex-wrap justify-start gap-2">
                {projectInfo.tags.map((tech:any,index:any) => <div key={index} className="border-2 italic border px-2 rounded-3xl border-black dark:border-white">{tech.name}</div>)}
            </div>
        </div>
    );
}