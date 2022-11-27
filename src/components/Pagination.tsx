import 'bootstrap-icons/font/bootstrap-icons.css';

type PaginationType = {
    pageNumbers: number[];
    previousPage: any;
    nextPage: any;
    paginate: any;
    currentPage: number;
    searchField: any;
}

const Pagination = ({ pageNumbers, previousPage, nextPage, paginate, currentPage, searchField }:PaginationType) => {

    return (
            <ul className={`${pageNumbers.length < 2 || searchField !== '' ? 'hidden' : 'flex flex-row gap-4 justify-center items-center mt-8'}`}>
                <li onClick={previousPage}>
                    <i className="bi bi-caret-left-fill text-lime-500 text-2xl hover:text-lime-600 cursor-pointer"></i>
                </li>
                {pageNumbers.map((number) => (
                <li
                    key={number}
                    onClick={() => paginate(number)}
                    className={` py-1 px-3 cursor-pointer ${currentPage === number ? ' rounded-full bg-lime-500 hover:bg-lime-600 drop-shadow-lg dark:text-neutral-900 text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'}`}
                >{number}
                </li>
                ))}
                <li onClick={nextPage} >
                    <i className="bi bi-caret-right-fill text-lime-500 text-2xl hover:text-lime-600 cursor-pointer"></i>
                </li>
            </ul>
    );
    };

export default Pagination;