import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from './themeContext';

export default function PaginationControls(props) {
  const {
    pageNumber, currentDocumentSize, recipeCount, setRecipeCount,
  } = props;
  const router = useRouter();
  const { query } = router;
  const { page, ...otherQueryParams } = query;
  const parsedValue = parseInt(page, 10);
  const { theme } = useTheme();

  let prevDisplay;
  if (pageNumber === 1) {
    prevDisplay = 'hidden';
  } else {
    prevDisplay = '';
  }
  let nextDisplay;
  if (pageNumber === 164959) {
    nextDisplay = 'hidden';
  } else {
    nextDisplay = '';
  }
  let controlsDisplay;
  if (currentDocumentSize - 100 <= 0) {
    controlsDisplay = 'hidden';
  } else {
    controlsDisplay = '';
  }

  const increaseCounter = () => {
    setRecipeCount(currentDocumentSize + (parsedValue * 100));
  };

  const decreaseCounter = () => {
    setRecipeCount(currentDocumentSize - 100);
  };
  return (
    <div className={` flex justify-center ${controlsDisplay}`}>
      <Link
        onClick={increaseCounter}
        href={{
          pathname: '/recipes',
          query: { page: pageNumber - 1, ...otherQueryParams }, // Update page parameter
        }}
        className={` ${theme === 'night' ? 'bg-cyan-700' : 'bg-cyan-400'} m-5 p-3 text-white rounded-md ${prevDisplay}`}
        as={{
          pathname: '/recipes',
          query: { page: pageNumber - 1, ...otherQueryParams }, // Update page parameter
        }}
        aria-label="pagination"
      >
        Previous page
      </Link>
      <div className=" bg-cyan-700 m-5 p-3 text-white rounded-md">
        {recipeCount}
        {' '}
        recipes left to view
      </div>
      <Link
        onClick={decreaseCounter}
        href={{
          pathname: '/recipes',
          query: { page: pageNumber + 1, ...otherQueryParams }, // Update page parameter
        }}
        className={` ${theme === 'night' ? 'bg-customDark' : 'bg-cyan-400'} m-5 p-3 text-white rounded-md ${nextDisplay}`}
        as={{
          pathname: '/recipes',
          query: { page: pageNumber + 1, ...otherQueryParams }, // Update page parameter
        }}
        aria-label="pagination"
      >
        Next page
      </Link>

    </div>
  );
}
