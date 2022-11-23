import 'bootstrap-icons/font/bootstrap-icons.css';

const Paginate = ({ postsPerPage, totalPosts, previousPage, nextPage, paginate, currentPage }:any) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
            <ul className="flex flex-row gap-4 cursor-pointer justify-center items-center mt-4">
                <li onClick={previousPage}>
                    <i className="bi bi-caret-left-fill text-gray-300 text-xl hover:text-2xl"></i>
                </li>
                {pageNumbers.map((number) => (
                <li
                    key={number}
                    onClick={() => paginate(number)}
                    className={`border rounded-md py-2 px-4 hover:bg-gray-300 dark:hover:bg-black border-gray-400 dark:border-white ${currentPage === number ? 'bg-gray-300 dark:bg-black' : ''}`}
                >{number}
                </li>
                ))}
                <li onClick={nextPage} >
                    <i className="bi bi-caret-right-fill text-gray-300 text-xl hover:text-2xl"></i>
                </li>
            </ul>
    );
    };

export default Paginate;