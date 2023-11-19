import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMitten,
  faTriangleExclamation,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { uuid } from 'uuidv4';
import RecipeInstruction from './updateRecipe/instructions';
import RecipeDescription from './updateRecipe/description';
import TagsDisplay from '../tags/tagsDisplay';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '../ui-utils/card';
import FavoriteButton from '../ui-utils/FavoriteButton';

export default function RecipeCard(prop) {
  const { recipe, allergensList } = prop;

  const [setIsEdited] = useState(false);

  const handleDescriptionEdit = () => {
    setIsEdited(true);
  };

  const convertToHours = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} minutes`;
    }
    return `${minutes} minutes`;
  };

  let instructionsContent;

  if (recipe.instructions && recipe.instructions.length > 0) {
    instructionsContent = (
      <div className="">
        <div className="">
          <h3 className="text-2xl font-semibold pb-2 pt-2">Instructions</h3>
          <RecipeInstruction recipe={recipe} onEdit={handleDescriptionEdit} />
        </div>
      </div>
    );
  } else {
    instructionsContent = (
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faTriangleExclamation} bounce size="xl" />
        <p>
          {recipe.instructions
            ? 'Error: Recipe instructions are empty.'
            : 'Error: Failed to load recipe instructions.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* {isEdited && <p>Recipe was edited</p>} */}
      <div className="p-4 flex flex-col  gap-3 bg-slate-900 text-red-100 justify-center">
        <div className="p-4 flex flex-col md:flex-row md:gap-10 bg-slate-900 text-red-100 ">
          <Carousel
            className=" md:max-w-2xl md:border-r-2 md:border-gray-400 md:pr-5"
            showArrows
          >
            {recipe.images.map((image) => (
              <div key={uuid()} className=" max-h-80">

                <Image
                  src={image}
                  alt={recipe.title}
                  width={350}
                  height={250}
                  loading="lazy"
                  placeholder="blur"
                />
              </div>
            ))}
          </Carousel>

          <Card className=" md:w-96">
            <h2 className=" text-3xl font-bold flex items-center justify-between ">
              {recipe.title}
              <FavoriteButton recipe={recipe} />
            </h2>

            <div className="flex mt-4 space-x-4 justify-center gap-8 mb-2">
              <p>
                <FontAwesomeIcon icon={faUtensils} size="xl" />
                Prep:
                {' '}
                {convertToHours(recipe.prep)}
                {' '}
              </p>
              <p>
                <FontAwesomeIcon icon={faMitten} size="xl" />
                Cook:
                {' '}
                {convertToHours(recipe.cook)}
                {' '}
              </p>
            </div>
            <TagsDisplay recipe={recipe} />
            <RecipeDescription
              recipe={recipe}
              allergensList={allergensList}
              onEdit={handleDescriptionEdit}
            />
          </Card>
        </div>

        <Card>
          {recipe.ingredients && Object.keys(recipe.ingredients).length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold pb-2 pt-2 ">
                Ingredients:
              </h3>
              <ul>
                {Object.keys(recipe.ingredients).map((ingredientKey) => (
                  <li key={uuid()}>
                    {' '}
                    {recipe.ingredients[ingredientKey]}
                    of
                    {ingredientKey}

                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        <Card>{instructionsContent}</Card>
      </div>
    </div>
  );
}
