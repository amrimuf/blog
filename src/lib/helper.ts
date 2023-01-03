export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

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
        logo = 'https://amri.tech/favicon/large-og.png',
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
    
        return `https://og-image.vercel.app/${ogTemplateTitle}.png?theme=dark&md=0&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg&images=${ogLogo}`;
        }
    
        return `https://og-image.vercel.app/${ogSiteName}.png?theme=dark&md=0&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg&images=${ogLogo}`
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