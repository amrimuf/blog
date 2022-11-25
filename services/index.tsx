import { request, gql } from "graphql-request";

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async () => {
    const query = gql `
    query Posts {
        posts(where: {isBlog: true}) {
            id
            category
            title
            slug
            headline
            thumbnail {
                url
            }
            content {
                html
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
            html
        }
        createdAt
        isBlog
        featured
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
                html
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
