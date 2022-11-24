import PostMetaTitle from './PostMetaTitle';

type PostInfoType = {
  category: string;
  createdAt: string;
  title: string;
  headline: string;
  slug: string;
};

export default function PostInfo({
  category,
  createdAt,
  title,
  headline,
  slug,
}: PostInfoType) {
  return (
    <div className=''>
      <PostMetaTitle 
        category={category} 
        date={createdAt}
        title={title}
        slug={slug}
      />
      <p className="text-gray-600 mt-5 dark:text-gray-400">
        {headline}        
      </p>
    </div>
  );
}