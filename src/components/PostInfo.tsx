import PostMetaTitle from './PostMetaTitle';

export default function PostInfo({...postInfo}) {
  return (
    <div>
      <PostMetaTitle 
        category={postInfo.category} 
        date={postInfo.createdAt}
        title={postInfo.title}
        slug={postInfo.slug}
        featured={postInfo.featured}
      />
      <p className="text-neutral-600 mt-5 dark:text-neutral-400">
        {postInfo.headline}        
      </p>
    </div>
  );
}