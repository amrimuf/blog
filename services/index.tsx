import { request, gql } from "graphql-request";

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async () => {
    const query = gql `
    query Posts {
        posts(where: {isBlog: true}) {
            category
            content {
                html
            }
            createdAt
            id
            publishedAt
            title
            updatedAt
            slug
            featured
            headline
            isBlog
            thumbnail {
                url
            }
            }
    }   
    `
    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getPost = async (slug:string) => {
    const query = gql `
    query Post ($slug: String!) {
        post(where: {slug: $slug}) {
        content {
            html
        }
        slug
        category
        headline
        title
        isBlog
        createdAt
        thumbnail {
            url
        }
        }
    }`

    const result = await request(graphqlAPI, query, { slug });

    return result.post;
}

export const getProjects = async() => {
    const query = gql `
    query Projects {
    projects {
        title,
        description,
        post {
            slug
        },
        thumbnail {
        url
        }
        tags {
            name
        }
    }
    }`

    const result = await request(graphqlAPI, query);

    return result.projects
}

export const getAbout = async() => {
    const query = gql `
    query About {
        abouts {
            headline
            content {
                html
            }
            githubLink
            linkedinLink
            title
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
