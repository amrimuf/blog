import PostMetaTitle from './PostMetaTitle';

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
      <p className="mt-5">
        {postInfo.headline}        
      </p>
    </div>
  );
}