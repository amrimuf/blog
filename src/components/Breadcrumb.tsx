import Link from 'next/link';

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="lg:w-10/12 mx-auto rounded-full hidden sm:block px-2 py-1" data-fade='0'>
        <ol className="list-reset flex truncate">
            {items.map((item, index) => (
            <li key={index}>
                {item.href ? (
                <Link href={item.href} className="text-lime-500 hover:underline capitalize">
                    {item.title}
                </Link>
                ) : (
                <span className="capitalize">{item.title}</span>
                )}
                {index < items.length - 1 && <span className="text-gray-500 mx-2">/</span>}
            </li>
            ))}
        </ol>
        </nav>
    );
}

export default Breadcrumb;
