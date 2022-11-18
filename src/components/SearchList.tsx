import PostCard from './PostCard';

export default function SearchList({ filteredPosts }: any) {
    console.log(filteredPosts)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 w-full">
        {filteredPosts.map((post:any) => (
        <div key={post.id} className="w-full px-4 border-2 rounded-lg border-sky-500 pb-6">
            <PostCard post={post} />
        </div>
        ))}
    </div>
    );
}