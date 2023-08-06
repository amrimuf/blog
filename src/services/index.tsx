import { request, gql } from "graphql-request";

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async () => {
    const query = gql `
    query Posts {
        posts(where: {isBlog: true} orderBy:createdAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
        }
    }`

    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getFilteredPosts = async (id:string[]) => {
    const query = gql `
    query Posts($id: [ID]) {
        posts(where: {isBlog: true, AND: {id_in: $id}} orderBy:createdAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
        }
    }`

    const result = await request(graphqlAPI, query, { id });

    return result.posts;
}

export const getPaginatedPosts = async (postsPerPage: number, endPost: number) => {
    const query = gql `
    query Posts($postsPerPage: Int!, $endPost: Int) {
        posts(first: $postsPerPage, skip: $endPost where: {isBlog: true} orderBy:createdAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
        }
    }`

    const result = await request(graphqlAPI, query, { postsPerPage, endPost });

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

    const result = await request(graphqlAPI, query);

    return result.postsConnection;
}

export const getNextPrevPosts = async () => {
    const query = gql `
    query Posts {
        posts( orderBy:createdAt_DESC) {
            id
            isBlog
            title
            slug
        }
    }`

    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getFeaturedPosts = async () => {
    const query = gql `
    query Posts {
        posts(where: {isBlog: true, AND: {featured: true}} orderBy:createdAt_DESC) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
            }
            createdAt
            publishedAt
            updatedAt
            featured
            isBlog
        }
    }`

    const result = await request(graphqlAPI, query);

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
                }
            }
        }
        createdAt
        updatedAt
        isBlog
        featured
        }
    }`

    const result = await request(graphqlAPI, query, { slug });

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
            }
            tags {
                name
            }
            nolink
        }
    }`

    const result = await request(graphqlAPI, query);

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
            }
            tags {
                name
            }
            nolink
            featured
        }
    }`

    const result = await request(graphqlAPI, query);

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

    const result = await request(graphqlAPI, query);

    return result.abouts
}

export const getProfile = async() => {
    const query = gql `
    query Profile {
        abouts {
            headline
            image {
                url
            }
        }
    }`

    const result = await request(graphqlAPI, query);

    return result.abouts
}

export const getTags = async() => {
    const query = gql `
    query Tags {
        tags {
            name
        }
    }`

    const result = await request(graphqlAPI, query);

    return result.tags
}
