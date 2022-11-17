import Image from 'next/image';
import Link from 'next/link';

import PostInfo from './PostInfo';

type PostInfoType = {
    category: string;
    createdAt: string;
    title: string;
    headline: string;
    slug: string;
    thumbnail: {
        url:string
    }
};

export default function PostCard({ ...postInfo }: PostInfoType) {
    return (
        <article className='-mx-4 lg:items-center items-start'>
            <Link href={`/${postInfo.slug}`} >
                <Image src={postInfo.thumbnail.url} alt={postInfo.title} width={500} height={500} className="w-full rounded mb-4" />
            </Link>
            <div className="lg:w-full md:w-5/12 w-full px-4">
                <PostInfo
                    {...postInfo}
                />
            </div>
            <hr className="border-black/10 w-10/12 mx-auto mt-10 md:hidden dark:border-white/10" />
        </article>
    );
}