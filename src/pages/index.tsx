import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { InferGetStaticPropsType } from "next";

import FeaturedPostCard from "@/components/FeaturedPostCard";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ProjectCard from "@/components/ProjectCard";
import { getProfile, getFeaturedPosts, getRecentProjects } from "@/services";
import { About, Post, Project } from "@/lib/types";

export default function home({
	featuredPosts,
	recentProjects,
	profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const halfIndex = Math.ceil(recentProjects.length / 2);
	const firstHalfRecentProjects = recentProjects.slice(0, halfIndex);
	const secondHalfRecentProjects = recentProjects.slice(halfIndex);

	const firstHalfFeaturedPosts = featuredPosts.filter(
		(_, index) => index % 2 === 0
	);
	const secondHalfFeaturedPosts = featuredPosts.filter(
		(_, index) => index % 2 !== 0
	);

	return (
		<Layout>
			<Seo />
			<Hero profile={profile} />

			<h2
				className={`${
					featuredPosts.length > 0
						? "mt-12 md:mt-8 pb-2 sm:pb-6"
						: "hidden"
				} `}
				data-fade="3"
			>
				Featured Posts
			</h2>
			<section data-fade="4">
				{/* back here: combine with post list */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full items-start">
					<div className="flex flex-col gap-4 lg:gap-6">
						{firstHalfFeaturedPosts.map((post: { id: string }) => (
							<FeaturedPostCard key={post.id} {...post} />
						))}
					</div>
					<div className="flex flex-col gap-4 lg:gap-6">
						{secondHalfFeaturedPosts.map((post: { id: string }) => (
							<FeaturedPostCard key={post.id} {...post} />
						))}
					</div>
				</div>
				<div className="flex">
					<Link
						href="/blog"
						className={`${
							featuredPosts.length > 0
								? "mx-auto mt-6 btn-primary"
								: "hidden"
						}`}
					>
						Show all posts
					</Link>
				</div>
			</section>

			<h2
				className={` ${
					recentProjects.length > 0
						? "mt-12 md:mt-8 pb-2 sm:pb-6 "
						: "hidden"
				}`}
				data-fade="5"
			>
				Recent Projects
			</h2>
			<section data-fade="6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full items-start">
					<div className="flex flex-col gap-4 lg:gap-6">
						{firstHalfRecentProjects.map((project: Project) => (
							<ProjectCard key={project.id} {...project} />
						))}
					</div>
					<div className="flex flex-col gap-4 lg:gap-6">
						{secondHalfRecentProjects.map((project: Project) => (
							<ProjectCard key={project.id} {...project} />
						))}
					</div>
				</div>
				<div className="flex">
					<Link
						href="/projects"
						className={` ${
							recentProjects.length > 0
								? "mx-auto mt-6 btn-primary"
								: "hidden"
						}`}
					>
						Show all projects
					</Link>
				</div>
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	const rawFeaturedPosts = (await getFeaturedPosts()) || [];
	const rawProfile = await getProfile();

	const featuredPosts = await Promise.all(
		rawFeaturedPosts.map(async (post: Post) => {
			const { base64 } = await getPlaiceholder(post.thumbnail.url);
			return {
				...post,
				blurDataURL: base64,
			};
		})
	);

	const profile = await Promise.all(
		rawProfile.map(async (prof: About) => {
			const { base64 } = await getPlaiceholder(prof.image.url);
			return {
				...prof,
				blurDataURL: base64,
			};
		})
	).then((values) => values);

	const rawRecentProjects = await getRecentProjects();
	const recentProjects = await Promise.all(
		rawRecentProjects.map(async (project: Project) => {
			const { base64 } = await getPlaiceholder(project.thumbnail.url);
			return {
				...project,
				blurDataURL: base64,
			};
		})
	).then((values) => values);

	return {
		props: {
			featuredPosts,
			recentProjects,
			profile: profile.length > 0 ? profile[0] : [],
		},
		revalidate: 120,
	};
}
