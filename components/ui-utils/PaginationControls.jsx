import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PaginationControls(props) {
  const { pageNumber } = props;

  let display = ''
  if (pageNumber === 1) {
    display = 'hidden'
    } else {
    display = ''
  }
  const router = useRouter()
  const { query } = router
  const { page, ...otherQueryParams } = query

  return (
    <div className=" flex justify-center ">
      <Link
        href={{
          pathname: '/recipes',
          query: { page: pageNumber - 1, ...otherQueryParams,  }, // Update page parameter
        }}
        className={` bg-cyan-400 m-5 p-3 text-white rounded-md ${display}`}
        as={{
          pathname: '/recipes',
          query: { page: pageNumber - 1, ...otherQueryParams,  }, // Update page parameter
        }}
        aria-label="pagination"
      >
        Previous page
      </Link>
      <Link
        href={{
          pathname: '/recipes',
          query: { page: pageNumber + 1, ...otherQueryParams,  }, // Update page parameter
        }}
        className=" bg-cyan-400 m-5 p-3 text-white rounded-md"
        as={{
          pathname: '/recipes',
          query: { page: pageNumber + 1, ...otherQueryParams,  }, // Update page parameter
        }}
        aria-label="pagination"
      >
        Next page
      </Link>
      
    </div>
  );
}
