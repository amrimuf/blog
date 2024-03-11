import { Post } from "@/lib/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Layout from "./Layout";
import PostList from "./PostList";
import Seo from "./Seo";

interface BlogSearch {
    posts: Post[]
    children?: React.ReactNode
    isLoading?:boolean
}

export default function BlogSearch({children, posts, isLoading}:BlogSearch) {
    const router = useRouter();

    const [isSearching, setIsSearching] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
       // new posts loaded
        useEffect(()=> {
            setIsSearching(false)
        }, [posts]);
    

    const [searchField, setSearchField] = useState(router.query.q ? router.query.q : '' );

    const handleChange = (e: {target: {value: string}} ) => {
        if (e.target.value == '') {
            setIsTyping(false)
            router.push('/blog')
            setIsSearching(true)
        } else {
            setIsSearching(false)
            setIsTyping(true)
        }
        setSearchField(e.target.value) 
    };


    const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key == 'Enter') {
            router.push(`/blog/search?q=${searchField}`,
        ) 
        setIsSearching(true)
        setIsTyping(false)
        }
    };
    return (
        <Layout>
        <Seo
        templateTitle='Blog'
        description='Notes and tips on all things web dev and programming!'
        />
        <h1 data-fade='0'>
            Blog
        </h1>
        <p className='mt-2 mb-6' data-fade='1'>
        Notes and tips on all things web dev and programming!
        </p>
        <div className={`${ posts.length !== 0 || searchField.length !== 0 ? 'relative w-full mb-4' : 'hidden'}`} data-fade='2'>
            <input 
            className="px-4 py-2 border-2 border-lime-500 dark:border-lime-500 block w-full rounded-full bg-white/70 dark:bg-black/30"
            type = "text" 
            placeholder = "Search posts"
            value={searchField}
            onChange = {handleChange} 
            onKeyUp = {handleKeyUp}
            />
            <GoSearch className="absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-gray-300"/>
        </div>

            {!isTyping ?
            <section data-fade='3'>
            <PostList 
                posts={posts} 
                isSearching={isSearching}
                isLoading={isLoading}
                searchField={searchField}
            /> 
            </section>
            : <span>Press enter to see the results.</span>}

            <div className={isTyping || isSearching ? 'hidden' : 'inline bg-red-500'}>
                { children }
            </div>

        </Layout>
    )
}