import Link from 'next/link';
import PostMetaTitle from './PostMetaTitle';
import { BsArrowRight } from 'react-icons/bs'

export default function PostInfo({...postInfo}) {
  return (
    <div>
      <PostMetaTitle 
        category={postInfo.category} 
        date={postInfo.updatedAt}
        title={postInfo.title}
        slug={postInfo.slug}
        featured={postInfo.featured}
        content={postInfo.content.json.children}
        topics={postInfo.topics}
      />
      <p className="mt-5 line-clamp-3">
        {postInfo.headline}        
      </p>
      <Link href={`/blog/${postInfo.slug}`} className='grid justify-end mt-4'>
        <span className='flex btn-secondary mr-auto gap-2 items-center'>
          read more<BsArrowRight/>
        </span>
      </Link>
    </div>
  );
}