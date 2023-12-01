import Link from 'next/link';
import { useState } from 'react';
import styles from './pagination.module.css';

function Pagination(props) {
  const { totalRecipeInDb } = props;
  const firstPage = 1;
  const [centerPage, setCenterPage] = useState(firstPage);

  const totalPages = Math.floor(totalRecipeInDb / 100);

  const handlePageClick = (page) => {
    if (page === firstPage) {
      setCenterPage(1);
    } else if (page === 'prev') {
      if (centerPage > 1) {
        setCenterPage(centerPage - 1);
      }
    } else if (page === 'next') {
      if (centerPage < totalPages) {
        setCenterPage(centerPage + 1);
      }
    } else if (page === totalPages) {
      setCenterPage(totalPages);
    } else {
      setCenterPage(parseInt(page, 10));
    }
  };

  return (
    <div className={styles.pagination}>
      {centerPage !== firstPage && (
        <Link
          href={`/recipeList/${centerPage - 1}`}
          onClick={() => { return handlePageClick('prev'); }}
        >
          &laquo;
        </Link>
      )}
      {centerPage - 1 >= 1 && (
        <Link
          href={`/recipeList/${firstPage}`}
          onClick={() => { return handlePageClick(firstPage); }}
          className={`${styles.page}`}
        >
          {firstPage}
        </Link>
      )}
      <Link
        href={`/recipeList/${centerPage}`}
        onClick={() => { return handlePageClick(centerPage); }}
        className={`${styles.page} ${styles.active}`}
      >
        {centerPage}
      </Link>
      {centerPage < totalPages && (
        <Link
          href={`/recipeList/${totalPages}`}
          onClick={() => { return handlePageClick(totalPages); }}
          className={`${styles.page}`}
        >
          {totalPages}
        </Link>
      )}
      {centerPage !== totalPages && (
        <Link
          href={`/recipeList/${centerPage + 1}`}
          onClick={() => { return handlePageClick('next'); }}
        >
          &raquo;
        </Link>
      )}
    </div>
  );
}

export default Pagination;
