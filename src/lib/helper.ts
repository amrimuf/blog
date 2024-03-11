import { deploymentURL } from '@/constant/env';

type OpenGraphType = {
    siteName: string;
    description: string;
    templateTitle?: string;
    logo?: string;
    banner?: string;
    isBlog?: boolean;
};

export function openGraph({
    siteName,
    templateTitle,
    description,
    banner,
    logo = `${deploymentURL}/assets/logo.jpg`,
    isBlog = false,
}: OpenGraphType): string {
    const ogLogo = encodeURIComponent(logo);
    const ogSiteName = encodeURIComponent(siteName.trim());
    const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
    const ogDesc = encodeURIComponent(description.trim());

    if (isBlog) {
    const ogBanner = banner ? encodeURIComponent(banner.trim()) : undefined;

    return `${deploymentURL}/api/blog?siteName=${ogSiteName}&templateTitle=${ogTemplateTitle}&banner=${ogBanner}`;
    }
    
    return `${deploymentURL}/api/general?siteName=${ogSiteName}&description=${ogDesc}${ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''}`
}

export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) => {
    if (slug.slice(0, 3) === 'id-') {
    return slug.slice(3);
    } else {
    return slug;
    }
};

/**
 * Access session storage on browser
 */
export function getFromSessionStorage(key: string) {
    if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
    }
    return null;
}

export function getFromLocalStorage(key: string) {
    if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
    }
    return null;
}

/**
 * Font Loader
 */

export const alexandriaFontLoader = (weight: string) =>
fetch(`${deploymentURL}/assets/fonts/Alexandria-${weight}.ttf`.toString()).then((res) => res.arrayBuffer())

export const getPageNumbers = (pageSize:{pageInfo:{pageSize:number}}) => {
    const postsPerPage = 6
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pageSize.pageInfo.pageSize / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return {postsPerPage, pageNumbers}
}