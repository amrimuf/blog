import 'bootstrap-icons/font/bootstrap-icons.css';

const Paginate = ({ postsPerPage, totalPosts, previousPage, nextPage, paginate, currentPage }:any) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
            <ul className="flex flex-row gap-4 justify-center items-center mt-4">
                <li onClick={previousPage}>
                    <i className="bi bi-caret-left-fill text-sky-500 text-2xl hover:text-sky-600 cursor-pointer"></i>
                </li>
                {pageNumbers.map((number) => (
                <li
                    key={number}
                    onClick={() => paginate(number)}
                    className={` py-1 px-3 cursor-pointer ${currentPage === number ? ' rounded-full bg-sky-500 hover:bg-sky-600 text-white drop-shadow-lg' : ''}`}
                >{number}
                </li>
                ))}
                <li onClick={nextPage} >
                    <i className="bi bi-caret-right-fill text-sky-500 text-2xl hover:text-sky-600 cursor-pointer"></i>
                </li>
            </ul>
    );
    };

export default Paginate;