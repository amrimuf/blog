import PostCard from './PostCard';

export default function SearchList({ filteredPosts }: any) {
    if (filteredPosts.length === 0) {
        return <p>Sorry, not found :(</p> 
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {filteredPosts.map((post:any) => (
                <div key={post.id} className="w-full px-4 rounded-xl pb-6 bg-white shadow-md hover:shadow-lg hover:scale-[1.02] duration-300 ease-in-out dark:bg-black dark:shadow-lime-700">
                    <PostCard post={post} />
                </div>
                ))}
            </div>
        );
    }
}