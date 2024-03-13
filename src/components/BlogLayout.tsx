import { Post, Topic } from "@/lib/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Layout from "./Layout";
import PostList from "./PostList";
import Seo from "./Seo";
import Link from 'next/link';
import { deploymentURL } from "@/constant/env";

interface BlogLayout {
    posts: Post[]
    children?: React.ReactNode
    isLoading?:boolean
    topics:Topic[]
    slug?: string
}

export default function BlogLayout({children, posts, isLoading, topics, slug}:BlogLayout) {
    const router = useRouter();

    const [isSearching, setIsSearching] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
       // new posts loaded
        useEffect(()=> {
            setIsSearching(false)
        }, [posts]);
    

    const [searchField, setSearchField] = useState(router.query.q ? router.query.q : '' );
    const [selectedTopic, setSelectedTopic] = useState(router.query.t ? router.query.t : router.query.topic);

    const handleChange = (e: {target: {value: string}} ) => {
        if (e.target.value == '' && router.pathname !== '/blog') {
            setIsTyping(false)
            if (selectedTopic) {
                router.push(`${deploymentURL}/blog/topics/${selectedTopic}`)
            } else {
                router.push('/blog')
            }
            setIsSearching(true)
        } else {
            setIsSearching(false)
            setIsTyping(true)
        }
        setSearchField(e.target.value) 
    };
    

    const handleFilter = (topicSlug:string) => {
        setIsSearching(true)
        setSelectedTopic(topicSlug)
            // select different topics
            if (selectedTopic != topicSlug && topicSlug ) {
                if (searchField && topicSlug) {
                    router.push(`/blog/search?q=${searchField}&t=${topicSlug}`)
                } else {
                    router.push(`${deploymentURL}/blog/topics/${topicSlug}`)
                }
            // select the same topic
            } else {
                if (searchField && topicSlug) {
                    router.push(`/blog/search?q=${searchField}`)
                    setSelectedTopic('')
                } else {
                    router.push('/blog')
                }
            }
        
    };

    const handleSearch = (searchField:string[] | string) => {
        if (selectedTopic) {
            router.push(`/blog/search?q=${searchField}&t=${selectedTopic}`) 
        } else {
            router.push(`/blog/search?q=${searchField}`)
        }
        setIsSearching(true)
        setIsTyping(false)
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key == 'Enter') {
            if (selectedTopic) {
                router.push(`/blog/search?q=${searchField}&t=${selectedTopic}`) 
            } else {
                router.push(`/blog/search?q=${searchField}`)
            }
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
        <h1 className='capitalize' data-fade='0'>
            Blog<span className={selectedTopic ? 'uppercase' :'hidden'}>: {selectedTopic} </span>
        </h1>
        <p className='mt-2' data-fade='1'>
        Notes and tips on all things web dev and programming!
        </p>
        <div className={ topics.length !== 0 ? "flex flex-wrap gap-2 mt-6 items-center justify-center sm:justify-start" : "hidden"} data-fade='2'>
            {topics.sort().map((t:Topic, index:number) => (
                <button 
                    onClick={() => handleFilter(t.slug)}
                    key={index}
                    className={ t.slug == slug || router.query.t == t.slug ? "label-selected" : "label"}
                >
                    {t.name}
                </button>
            ))}
            <button  onClick={() => router.pathname !== '/blog' ? handleFilter('') : ''} className='btn-primary'
                >Show all</button>
        </div>

        <div className={`${ posts.length !== 0 || router.pathname !== '/blog' ? 'relative w-full my-4' : 'hidden'}`} data-fade='2'>
            <input 
            className="px-4 py-2 border-2 border-lime-500 dark:border-lime-500 block w-full rounded-full bg-white/70 dark:bg-black/30"
            type = "text" 
            placeholder = "Search posts"
            value={searchField}
            onChange = {handleChange} 
            onKeyUp = {handleKeyUp}
            />
            <button onClick={() => router.pathname !== '/blog' || searchField ? handleSearch(searchField): ''} className="flex gap-x-2 items-center absolute right-0 top-0 btn-primary text-base"><GoSearch className=" h-5 w-5"/> Search</button>
        </div>
            {/* {!isTyping ? */}
            <section data-fade='3'>
            <PostList 
                posts={posts} 
                isSearching={isSearching}
                isLoading={isLoading}
            /> 
            </section>
            {/* : <span>Press enter or click search button to see the results.</span>} */}

            <div className={isTyping || isSearching ? 'hidden' : 'inline bg-red-500'}>
                { children }
            </div>

        </Layout>
    )
}