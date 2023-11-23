import Link from 'next/link';

export default function PaginationControls(props) {
  const { pageNumber } = props;
  return (
    <div className=" flex justify-center ">
      <Link
        href={`/recipeList/page=${pageNumber - 1}`}
        className=" bg-cyan-400 m-5 p-3 text-white rounded-md"
        as={`/recipeList/page=${pageNumber - 1}`}
        aria-label="pagination"
      >
        Previous page
      </Link>
      <Link
        href={`/recipeList/page=${pageNumber + 1}`}
        className=" bg-cyan-400 m-5 p-3 text-white rounded-md"
        as={`/recipeList/page=${pageNumber + 1}`}
        aria-label="pagination"
      >
        Next page
      </Link>
    </div>
  );
}
