import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faKitchenSet,
  faSpoon,
  faCircleChevronRight,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { v4 } from 'uuid';

export default function RecipePreviewCard(props) {
  const { recipe, convertToHours, searchQuery } = props;
  const [currentImage, setCurrentImage] = useState(0);

  function nextSlide() {
    setCurrentImage((prevImage) => (prevImage + 1) % recipe.images.length);
  }

  function prevSlide() {
    setCurrentImage((prevImage) => (prevImage - 1 + recipe.images.length) % recipe.images.length);
  }
  //  Highlighting helper
  function highlightingMatchingWords(text) {
    if (!searchQuery || searchQuery === '') {
      return text; // Return original text if there's no search query
    }
  
    const regex = new RegExp(searchQuery, 'gi');
    const matches = text.match(regex);
  
    if (!matches) {
      return text; // Return original text if there are no matches
    }
  
    return (
      <span>
        {text.split(regex).map((segment, index) => (
          <span key={index}>
            {segment}
            {index < matches.length && (
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

  return (
    <div className="group relative">
      <li
        // eslint-disable-next-line no-underscore-dangle
        key={recipe._id}
        className="relative bg-gray-800 p-4 rounded-lg transition flex flex-col flex-grow-1 flex-basis-1"
      >
        <div className="w-full h-48 overflow-hidden">
          <img
            src={recipe.images[currentImage]}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute left-0 top-28 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={prevSlide}
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button
            type="button"
            className="absolute right-0 top-28 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={nextSlide}
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
        <div className=" absolute opacity-70 group-hover:opacity-100">
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
       
        <Link href={`/recipeDetails/${recipe._id}`} className="mt-4">
         
          <button>View Recipe</button>
        </Link>
      </li>
    </div>
  );
}
