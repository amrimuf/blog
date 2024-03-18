import { request, gql } from "graphql-request";

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

// back here: result types
// https://github.com/vercel/next.js/blob/canary/examples/cms-graphcms/lib/graphcms.js
export const getPosts = async () => {
    const query = gql `
    query Posts {
        posts(where: {isBlog: true} orderBy:updatedAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
                width
                height
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
            topics {
                name
                slug
            }
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.posts;
}

export const getFilteredPosts = async (id:string[], t:string) => {
    const query = gql `
    query Posts($id: [ID], $t: String) {
        posts(where: {isBlog: true, AND: [
            { id_in: $id }
            {
                OR: [
                    { topics_some: { name_contains: $t } }
                    { topics_none: {} }
                ]
                }
            ]} orderBy:updatedAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
                width
                height
            }
            createdAt
            publishedAt
            content {
                json
            }
            updatedAt
            featured
            isBlog
            topics {
                name
                slug
            }
        }
    }`

    const result: any = await request(graphqlAPI, query, { id, t });

    return result.posts;
}

export const getPaginatedPosts = async (postsPerPage: number, endPost: number) => {
    const query = gql `
    query Posts($postsPerPage: Int!, $endPost: Int) {
        posts(first: $postsPerPage, skip: $endPost where: {isBlog: true} orderBy:updatedAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
                width
                height
            }
            content {
                json
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
            topics {
                name
                slug
            }
        }
    }`

    const result: any = await request(graphqlAPI, query, { postsPerPage, endPost });

    return result.posts;
}

export const getPageSize = async () => {
    const query = gql `
    query Posts {
        postsConnection(where: {isBlog: true}) {
            pageInfo {
                pageSize
            }
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.postsConnection;
}

export const getNextPrevPosts = async () => {
    const query = gql `
    query Posts {
        posts( orderBy:updatedAt_DESC) {
            id
            isBlog
            title
            slug
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.posts;
}

export const getFeaturedPosts = async () => {
    const query = gql `
    query Posts {
        posts(where: {isBlog: true, AND: {featured: true}} orderBy:updatedAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
                width
                height
            }
            content {
                json
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
            topics {
                name
                slug
            }
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.posts;
}

export const getPost = async (slug:string) => {
    const query = gql `
    query Post ($slug: String!) {
        post(where: {slug: $slug}) {
        category
        title
        slug
        headline
        thumbnail {
            url
            width
            height
        }
        content {
            json
            references {
                ... on Asset {
                    id
                    url
                    mimeType
                    width
                    height
                    fileName
                }
                ... on Post {
                    id
                    title
                    headline
                    slug
                }
            }
        }
        createdAt
        updatedAt
        isBlog
        featured
        topics {
            name
            slug
        }
        }
    }`

    const result: any = await request(graphqlAPI, query, { slug });

    return result.post;
}

export const getProjects = async() => {
    const query = gql `
    query Projects() {
        projects(orderBy:createdAt_DESC) {
            id,
            title,
            post {
                slug
            },
            description,
            thumbnail {
                url
                width
                height
            }
            tags {
                name
            }
            nolink
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.projects
}

export const getRecentProjects = async() => {
    const query = gql `
    query Projects() {
        projects(orderBy:createdAt_DESC first:4) {
            id,
            title,
            post {
                slug
            },
            description,
            thumbnail {
                url
                width
                height
            }
            tags {
                name
            }
            nolink
            featured
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.projects
}

export const getAbout = async() => {
    const query = gql `
    query About {
        abouts {
            title
            headline
            image {
                url
                width
                height
            }
            content {
                json
                references {
                    ... on Asset {
                        url
                        width
                        height
                    }
                }
            }
            githubLink
            linkedinLink
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.abouts
}

export const getProfile = async() => {
    const query = gql `
    query Profile {
        abouts {
            headline
            image {
                url
                width
                height
            }
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.abouts
}

export const getTags = async() => {
    const query = gql `
    query Tags {
        tags {
            name
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.tags
}

export const getTopics = async() => {
    const query = gql `
    query Topics {
        topics {
            name
            slug
        }
    }`

    const result: any = await request(graphqlAPI, query);

    return result.topics
}

export const getPostsByTopic = async (slug:string) => {
    const query = gql `
    query Posts($slug: String!) {
        posts(where: {topics_some: {slug: $slug}, isBlog: true} orderBy: createdAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
                width
                height
            }
            createdAt
            publishedAt
            content {
                json
            }
            updatedAt
            featured
            isBlog
            topics {
                name
                slug
            }
        }
    }`

    const result: any = await request(graphqlAPI, query, { slug });

    return result.posts;
}