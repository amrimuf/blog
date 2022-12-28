import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

type PaginationType = {
    pageNumbers: number[];
    currentPage: number;
}

const Pagination = ({ pageNumbers, currentPage }:PaginationType) => {

    return (
            <ul className={'flex flex-row gap-4 justify-center items-center mt-8'}>
                <li>
                    <Link href={ currentPage !== 1 ? `/blog/${currentPage-1}` : `/blog/${currentPage}`}><i className="bi bi-caret-left-fill text-lime-500 text-2xl hover:text-lime-600 cursor-pointer"></i></Link>
                </li>
                {pageNumbers.filter((number) => (currentPage > 9 ? number > currentPage-6 && number < currentPage+5 : number <= 10)).map((number) => (
                <li
                    key={number}
                    className={` py-1 px-3 cursor-pointer ${currentPage === number ? ' rounded-full bg-lime-500 hover:bg-lime-600 drop-shadow-lg dark:text-neutral-900 text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'}`}
                ><Link href={`/blog/${number}`}>{number}</Link>
                </li>
                ))}

                <li>
                    <Link href={pageNumbers.length !== currentPage ?`/blog/${currentPage+1}` : `/blog/${currentPage}`}><i className="bi bi-caret-right-fill text-lime-500 text-2xl hover:text-lime-600 cursor-pointer"></i></Link>
                </li>
            </ul>
    );
    };

export default Pagination;