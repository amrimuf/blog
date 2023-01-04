export type Project = {
    id: string;
    category: string;
    createdAt: string;
    title: string;
    headline: string;
    slug: string;
    author: string;
    description:string;
    tags: {
        name:string
    }[]
    thumbnail: {
        url:string
    }
    post: {
        slug: string
    }
    nolink: string;
    blurDataURL: string;
};

export type Post = {
    id: string;
    slug: string;
    thumbnail: {
        url: string
    };
    title: string;
    category: string;
    createdAt: string;
    headline: string;
    blurDataURL:string;
    featured: boolean
}

export type PostMetaTitleType = {
    category: string;
    date: string;
    title: string;
    center?: boolean;
    slug:string;
    featured:boolean;
};

export type About = {
    image: {
        url: string
    }
    headline:string,
    title:string,
    blurDataURL:string
}