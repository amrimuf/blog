import Image from 'next/image';
import React from 'react';

import Layout from '../components/Layout';
import PostMetaTitle from '../components/PostMetaTitle';
import Seo from '../components/Seo';
import { getPost } from '../../services';

type Post = {
    post: {
        title: string,
        category:string,
        createdAt:string,
        slug:string,
        headline:string,
        content: {
            html:string
        }
        thumbnail: {
            url:string
        }
    },
}

export default function Detail({ post }: Post) {
    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
    const content = post.content.html

    React.useEffect(() => {
		// Updating a state causes a re-render
		setInitialRenderComplete(true);
	}, []);
    if (!initialRenderComplete) {
		// Returning null will prevent the component from rendering, so the content will simply be missing from
		// the server HTML and also wont render during the first client-side render.
		return null;
	} else {

    return (
        <Layout>
            <Seo
            templateTitle={post.title}
            description={post.headline}
            />

            <div className="md:w-10/12 w-full mx-auto flex items-center flex-col">
                <div className="flex justify-center -mx-4 flex-wrap mt-6">
                    <PostMetaTitle
                    category={post.category}
                    date={post.createdAt}
                    title={post.title}
                    slug={post.slug}
                    center
                    />
                </div>

                <Image src={post.thumbnail.url} alt={post.title} width={500} height={500} className="w-full rounded mb-6" />
            
            </div>
            <div className="lg:w-10/12 w-full mx-auto leading-relaxed">
                <div className='wysiwyg lg:wysiwyg-xl dark:wysiwyg-dark' dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </Layout>
    );
}
}

export async function getServerSideProps({params}:any) {
    const post = await getPost(params.slug) || [] 
    return {
        props: { post }
    }
}