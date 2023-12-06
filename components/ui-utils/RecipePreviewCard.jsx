import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faKitchenSet,
  faSpoon,
  faCircleChevronRight,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { v4 } from 'uuid';
import FavoriteButton from './FavoriteButton';

export default function RecipePreviewCard(props) {
  const { recipe, convertToHours, searchQuery } = props;
  const [currentImage, setCurrentImage] = useState(0);

  // Check if recipe is undefined or null
  if (!recipe || !recipe.images || !recipe.images.length) {
    return null;
  }

  function nextSlide() {
    setCurrentImage((prevImage) => (prevImage + 1) % recipe.images.length);
  }

  function prevSlide() {
    setCurrentImage((prevImage) => (prevImage - 1 + recipe.images.length) % recipe.images.length);
  }

  // Highlighting helper
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
          <span key={v4()}>
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

  const title = highlightingMatchingWords(recipe.title || '', searchQuery);
  const buttonColorClass = 'bg-gray-700'; // Replace with your desired background color

  return (
    <div className="group relative bg-gray-800 text-white">
      <li
        key={recipe._id}
        className="relative p-4 rounded-lg transition flex flex-col flex-grow-1 flex-basis-1"
      >
        <div className="w-full h-48 overflow-hidden relative">
          <img
            src={recipe.images[currentImage]}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-md"
          />
          <button
            aria-label="button"
            type="button"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={prevSlide}
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button
            aria-label="button"
            type="button"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={nextSlide}
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
        <div className="absolute opacity-70 group-hover:opacity-100">
          <FavoriteButton recipe={recipe} />
        </div>

        <h2 className="text-xl font-semibold mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {title || recipe.title}
        </h2>
        <p className="mt-2">
          <FontAwesomeIcon icon={faUtensils} />
          {` Prep: ${convertToHours(recipe.prep)}`}
        </p>
        <p>
          <FontAwesomeIcon icon={faKitchenSet} />
          {` Cook: ${convertToHours(recipe.cook)}`}
        </p>
        <p>
          <FontAwesomeIcon icon={faSpoon} />
          {` Total: ${convertToHours(recipe.prep + recipe.cook)}`}
        </p>

        <Link href={`/recipeDetails/${recipe._id}`}>
          <button
            aria-label="button"
            type="button"
            className={`${buttonColorClass} px-3 py-1 text-white font-thin rounded-lg inline-block transition-all duration-300 ease-in-out hover:text-sky-600 hover:font-semibold hover:tracking-wider hover:bg-transparent hover:shadow-md`}
          >
            View Recipe
          </button>
        </Link>
      </li>
    </div>
  );
}
