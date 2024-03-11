export type Project = {
    id: string;
    category: string;
    createdAt: string | Date;
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

export interface Topic {
    name: string,
    slug: string
}

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
    isBlog: boolean
    topics: Topic[]
}

export interface Paragraph {
    text: string;
}

export interface Content {
    type: string;
    children: Paragraph[];
}

export type PostMetaTitleType = {
    category: string;
    date: string | Date;
    title: string;
    center?: boolean;
    slug:string;
    featured:boolean;
    content: Content[]
    topics: Topic[]
};

export type About = {
    image: {
        url: string
    }
    headline:string,
    title:string,
    blurDataURL:string
}