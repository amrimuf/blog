import {BsCaretLeftFill, BsCaretRightFill} from 'react-icons/bs'
import Link from 'next/link';

type PaginationType = {
    pageNumbers: number[];
    currentPage: number;
    setIsLoading:any
}

const Pagination = ({ pageNumbers, currentPage, setIsLoading }:PaginationType) => {
    return (
        <div className={pageNumbers.length < 2 ? 'hidden' : 'flex flex-row gap-4 justify-center items-center mt-8'}>
            <Link href={ currentPage > 2 ? `/blog/page/${currentPage-1}` : `/blog/`}>
                <button onClick={() => setIsLoading(true)} >
                    <BsCaretLeftFill className='text-lime-500 text-2xl hover:text-lime-600 cursor-pointer'/>
                </button>
            </Link>

            {pageNumbers.filter((number) => (currentPage > 9 ? number > currentPage-6 && number < currentPage+5 : number <= 10)).map((number) => (
                <Link href={number !== 1 ? `/blog/page/${number}` : '/blog'} key={number}>
                <button onClick={() => setIsLoading(true)}
                    className={` py-1 px-3 cursor-pointer ${currentPage === number ? ' rounded-full bg-lime-500 shadow-md shadow-lime-500/60 dark:text-neutral-900 text-neutral-100 focus:bg-lime-500' : ''}`}
                >
                    {number}
                </button>
                </Link>
            ))}

            <Link href={pageNumbers.length !== currentPage ?`/blog/page/${currentPage+1}` : `/blog/page/${currentPage}`}>
                <button onClick={() => setIsLoading(true)}>
                    <BsCaretRightFill className='text-lime-500 text-2xl hover:text-lime-600 cursor-pointer'/>
                </button>
            </Link>
        </div>
    );
};

export default Pagination;