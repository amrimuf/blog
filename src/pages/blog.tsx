import { SetStateAction, useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SearchList from "../components/SearchList";
import { getPosts } from '../../services';
import Paginate from "../components/Paginate";

export default function Blog({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [searchField, setSearchField] = useState("");
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3); 

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber:any) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
    }
    };

    const nextPage = () => {
    if (currentPage !== Math.ceil(blogPosts.length / postsPerPage)) {
        setCurrentPage(currentPage + 1);
    }
    };

    useEffect(() => {
        const fetchBlogPosts = async () => {
        const posts = await getPosts() || [] 

        setBlogPosts(posts);
    };
    fetchBlogPosts();
    }, []);

    const filteredPosts = posts.filter(
        (post: { title: string; category: string; isBlog:boolean })  => {
            return (
            post.title
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            post.category
            .toLowerCase()
            .includes(searchField.toLowerCase())
            );
        }
    )

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchField(e.target.value);
    };

    return (     
        <Layout>
            <Seo
            templateTitle='Blog'
            description='Thoughts and tutorials about web development and programming.'
            />
            <h1 className='text-2xl font-bold text-neutral-900 lg:text-5xl dark:text-neutral-100' data-fade='0'>
                Blog
            </h1>
            <p className='mt-2 text-neutral-600 dark:text-neutral-400 mb-6' data-fade='1'>
            Thoughts and tutorials about web development and programming.
            </p>
            <div className="relative w-full mb-4">
                <input 
                className="px-4 py-2 border-2 border-lime-500 dark:border-lime-500 block w-full rounded-full bg-white dark:bg-black text-neutral-900 dark:text-neutral-100"
                type = "text" 
                placeholder = "Search articles"
                onChange = {handleChange} 
                />
                <svg className="absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            {currentPosts.length > 0  ?
            <SearchList filteredPosts={searchField === '' ? currentPosts : filteredPosts} />      
            : <div>Loading...</div> }
                <Paginate
                postsPerPage={postsPerPage}
                totalPosts={blogPosts.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
                currentPage={currentPage}
                />
        </Layout>
    );
}

export async function getServerSideProps() {
    const posts = await getPosts() || [] 

    return {
        props: { posts }
    }
}