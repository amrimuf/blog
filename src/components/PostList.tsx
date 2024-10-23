import PostCard from "./PostCard";
import { Post } from "@/lib/types";

import clsx from "clsx";
import { useRouter } from "next/router";

interface PostList {
	posts: Post[];
	isLoading?: boolean;
	isSearching: boolean;
}

export default function PostList({ posts, isLoading, isSearching }: PostList) {
	const router = useRouter();
	const query = router.query.q;
	const topic = router.query.t;

	let className;
	let text;

	const firstHalfPosts = posts.filter((_, index) => index % 2 === 0);
	const secondHalfPosts = posts.filter((_, index) => index % 2 !== 0);

	if (router.pathname !== "/blog") {
		className = "text-center";
		text = (
			<p>
				Oops! No results found
				{query && (
					<>
						{" for "}
						<b>{query}</b>
					</>
				)}
				{topic && (
					<>
						{" on "}
						<b>{topic}</b>
						{" topic"}
					</>
				)}
				{" :("}
			</p>
		);
	} else {
		className = "text-left font-semibold";
		text = "My first post — coming soon!";
	}

	if (isLoading || isSearching) {
		return (
			<div
				className="flex justify-center items-center space-x-1"
				data-fade="3"
			>
				<div className="flex justify-center">
					<span className="circle animate-loader"></span>
					<span className="circle animate-loader animation-delay-200"></span>
					<span className="circle animate-loader animation-delay-400"></span>
				</div>
			</div>
		);
	} else if (posts.length === 0) {
		return (
			<div className={clsx(className, "!text-lime-500 text-lg mt-2")}>
				{text}
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-start">
				<div className="flex flex-col gap-6">
					{firstHalfPosts.map((post: Post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
				<div className="flex flex-col gap-6">
					{secondHalfPosts.map((post: Post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		);
	}
}
