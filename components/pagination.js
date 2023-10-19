import Link from 'next/link';
import { useState } from 'react';
import styles from './Pagination.module.css';

function Pagination(props) {
    const {totalRecipeInDb: totalPages} = props
    const firstPage = 1
    const [centerPage, setCenterPage] = useState(firstPage);

    const handlePageClick = (page) => {

        if (page=== firstPage) {
            setCenterPage(1)
        }
        if (page === 'prev') {
            if (centerPage > 1) {
                setCenterPage(centerPage - 1);
            }
        } else if (page === 'next') {
        if (centerPage < totalPages) {
            setCenterPage(centerPage + 1);
        }
        if (page===totalPages) {
            setCenterPage(totalPages)
        }
        } else {
        setCenterPage(parseInt(page, 10));
        }
    };

    return (
        <div className={styles.pagination}>
            <Link href={`/recipe-list/${centerPage - 1}`} onClick={() => handlePageClick(centerPage - 1)}>
                &laquo;
            </Link>
            <Link href={`/recipe-list/${firstPage}`} onClick={() => handlePageClick(firstPage)} className={`${styles.page}`}>
                1
            </Link>
            <Link href={`/recipe-list/${centerPage}`} onClick={() => handlePageClick(centerPage)} className={`${styles.page} ${styles.active}`}>
                {centerPage}
            </Link>
            <Link href={`/recipe-list/${centerPage + 1}`} onClick={() => handlePageClick(centerPage + 1)} className={`${styles.page}`}>
                {centerPage + 1}
            </Link>
            <Link href={`/recipe-list/${totalPages}`} onClick={() => handlePageClick(totalPages)} className={`${styles.lastPage}`}>
                {totalPages}
            </Link>
            <Link href={`/recipe-list/${centerPage + 1}`} onClick={() => handlePageClick(centerPage + 1)}>
                &raquo;
            </Link>

        </div>
    );
}

export default Pagination;













// import Link from 'next/link';
// import { useState } from 'react';
// import styles from './Pagination.module.css';

// function Pagination(props) {
//     const {totalRecipeInDb: totalPages} = props
//     const firstPage = 1
//     const [centerPage, setCenterPage] = useState(firstPage);

//     const handlePageClick = (page) => {

//         if (page=== firstPage) {
//             setCenterPage(1)
//         }
//         if (page === 'prev') {
//             if (centerPage > 1) {
//                 setCenterPage(centerPage - 1);
//             }
//         } else if (page === 'next') {
//         if (centerPage < totalPages) {
//             setCenterPage(centerPage + 1);
//         }
//         if (page===totalPages) {
//             setCenterPage(totalPages)
//         }
//         } else {
//         setCenterPage(parseInt(page, 10));
//         }
//     };

//     return (
//         <div className={styles.pagination}>
//         <Link href="/recipe-list" onClick={() => handlePageClick('prev')}>&laquo;</Link>
//         {centerPage - 1 >= 1 && (
//             <Link href={`/recipe-list`} onClick={() => handlePageClick(firstPage)} className={`${styles.page}`}>1</Link>
//         )}
//         <Link href={`/recipe-list`} onClick={() => handlePageClick(centerPage)} className={`${styles.page} ${styles.active}`}>{centerPage}</Link>
//         {centerPage + 1 < totalPages && (
//             <Link href={`/recipe-list`} onClick={() => handlePageClick(centerPage + 1)} className={`${styles.page}`}>{centerPage + 1}</Link>
//         )}
//         { centerPage < totalPages &&
//         <Link href="/recipe-list" onClick={() => handlePageClick(totalPages)} className={`${styles.lastPage}`}>{totalPages}</Link>
//         }
//         <Link href="/recipe-list" onClick={() => handlePageClick('next')}>&raquo;</Link>
//         </div>
//     );
// }

// export default Pagination;