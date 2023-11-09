import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faKitchenSet,
  faSpoon,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function RecipePreviewCard(props) {
  const { recipe, convertToHours, searchQuery } = props;

  //  Highlighting helper
  function highlightingMatchingWords(text) {
    const regex = new RegExp(searchQuery, 'gi');

    // const highlightedTitle = text.replace(regex, `<span style={{ backgroundColor:
    // 'green', color: 'white' } >${searchQuery}</span>`)

    // return (
    //   <span  dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
    // );
    const segments = text.split(regex);
    const matches = text.match(regex);

    return (
      <span>
        {segments.map((segment, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>
            {segment}
            {matches && index < matches.length && (
              <span className="bg-green-500 text-white font-extrabold">
                {matches[index]}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  }

  const title = highlightingMatchingWords(recipe.title, searchQuery);

  //  if (searchQuery){
  //   const regex = new RegExp( searchQuery, 'gi')
  // highlightedTitle = recipe.title.replace(regex, `<span className=" text-green-300">
  // ${searchQuery}</span>`)
  //  }

  return (
    <div>
      <li
        // eslint-disable-next-line no-underscore-dangle
        key={recipe._id}
        className="relative bg-gray-800 p-4 rounded-lg transition flex flex-col flex-grow-1 flex-basis-1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.images[0]}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className=" absolute opacity-70 hover:opacity-100">
          <FavoriteButton recipe={recipe} />
        </div>

        <h2 className="text-xl font-semibold mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {title || recipe.title}
        </h2>
        <p className="mt-2">
          <FontAwesomeIcon icon={faUtensils} />
          Prep:
          {convertToHours(recipe.prep)}
        </p>
        <p>
          <FontAwesomeIcon icon={faKitchenSet} />
          Cook:
          {convertToHours(recipe.cook)}
        </p>
        <p>
          <FontAwesomeIcon icon={faSpoon} />
          Total:
          {convertToHours(recipe.prep + recipe.cook)}
        </p>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Link href={`/recipeDetails/${recipe._id}`} className="mt-4">
          {/* eslint-disable-next-line react/button-has-type */}
          <button>View Recipe</button>
        </Link>
      </li>
    </div>
  );
}