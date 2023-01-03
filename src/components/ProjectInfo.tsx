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
    nolink: string
};

export default function ProjectInfo({...projectInfo}: ProjectInfoType) {
    return (
        <div className='w-full md:w-10/12 flex flex-col space-y-2 py-6'>
            <div className="flex flex-row gap-4 items-center">
                <h1 className='small-title'>{projectInfo.title}</h1>
                {projectInfo.post || projectInfo.nolink ?  <i className="bi bi-box-arrow-up-right"></i> : ''}
            </div>
            <hr className="border-black/20 w-full mx-auto mt-10 md:hidden dark:border-white/20" />
            <p>{projectInfo.description}</p>
            <div className="flex flex-wrap justify-start gap-2">
                {projectInfo.tags.map((tag:any,index:any) => <div key={index} className="ring-1 ring-lime-500 italic px-2 rounded-full mt-2">{tag.name}</div>)}
            </div>
        </div>
    );
}