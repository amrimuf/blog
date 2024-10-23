import { InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import Seo from "@/components/Seo";
import { getProjects, getTags } from "@/services";
import { getPlaiceholder } from "plaiceholder";
import { Project } from "@/lib/types";

export default function Projects({
	tags,
	projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [filteredProjects, setFilteredProjects] =
		useState<Project[]>(projects);
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	const handleToggleTag = (tag: string) => {
		const fetchProjects = async () => {
			const data = projects.filter((project: Project) => {
				return selectedFilters.some((selectedFilter) =>
					project.tags.some(
						(tag: { name: string }) =>
							tag.name.toLowerCase() ===
							selectedFilter.toLowerCase()
					)
				);
			});
			setFilteredProjects(data);
		};

		// select/unselect filter
		selectedFilters.includes(tag)
			? selectedFilters.splice(selectedFilters.indexOf(tag), 1)
			: selectedFilters.push(tag);

		selectedFilters.length !== 0
			? fetchProjects()
			: setFilteredProjects(projects);
	};

	const handleClear = () => {
		setFilteredProjects(projects);
		setSelectedFilters([]);
	};

	const halfIndex = Math.ceil(filteredProjects.length / 2);
	const firstHalfFilteredProjects = filteredProjects.slice(0, halfIndex);
	const secondHalfFilteredProjects = filteredProjects.slice(halfIndex);

	return (
		<Layout>
			<Seo
				templateTitle="Projects"
				description="Some of the cool projects I\'ve been tinkering with lately!"
			/>
			<h1 data-fade="0">Projects</h1>
			<p className="mt-2" data-fade="1">
				Some of the cool projects I've been tinkering with lately!
			</p>

			<div
				className={`${
					filteredProjects.length > 0
						? "flex flex-wrap gap-2 mt-6 items-center justify-center sm:justify-start"
						: "hidden"
				}`}
				data-fade="3"
			>
				{tags.sort().map((tag: string, index: number) => (
					<button
						key={index}
						onClick={() => handleToggleTag(tag)}
						className={`flex gap-1 items-center pl-2 pr-1 ${
							selectedFilters.includes(tag)
								? "label-selected"
								: "label"
						}`}
					>
						{tag}
						<span className="my-1 px-1 rounded-full bg-lime-500 text-neutral-100 dark:text-neutral-900 text-xs">
							{
								projects.filter((project: Project) =>
									project.tags.some(
										(t: { name: string }) =>
											t.name.toLowerCase() ===
											tag.toLowerCase()
									)
								).length
							}
						</span>
					</button>
				))}
				<button onClick={() => handleClear()} className="btn-primary">
					Show All projects
				</button>
			</div>

			{filteredProjects.length > 0 ? (
				<div
					className="mt-4 grid sm:grid-cols-2 gap-6 items-start"
					data-fade="4"
				>
					<div className="flex flex-col gap-6">
						{firstHalfFilteredProjects.map((project: Project) => (
							<ProjectCard key={project.id} {...project} />
						))}
					</div>
					<div className="flex flex-col gap-6">
						{secondHalfFilteredProjects.map((project: Project) => (
							<ProjectCard key={project.id} {...project} />
						))}
					</div>
				</div>
			) : (
				<p
					className="font-semibold !text-lime-500 text-lg mt-6"
					data-fade="4"
				>
					My first project - coming soon!
				</p>
			)}
		</Layout>
	);
}

// back here: ssg -> cs
export async function getStaticProps() {
	const tagsAsObject = await getTags();
	const tags: string[] = [];
	tagsAsObject.map((tag: { name: string }) => tags.push(tag.name));

	const rawProjects = await getProjects();
	const projects = await Promise.all(
		rawProjects.map(async (project: Project) => {
			const { base64 } = await getPlaiceholder(project.thumbnail.url);
			return {
				...project,
				blurDataURL: base64,
			};
		})
	);

	return {
		props: { tags, projects },
		revalidate: 120,
	};
}
