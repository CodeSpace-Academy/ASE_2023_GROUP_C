import FavoriteButton from "./FavoriteButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faKitchenSet, faSpoon } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export function RecipePreviewCard(props) {
  const { 
    recipe,
    convertToHours
   } = props

  return (
    <>
      <li key={recipe._id}>
        <div className="relative bg-gray-800 p-4 rounded-lg transition hover:shadow-lg flex flex-col flex-wrap w-300">
          <img
            src={recipe.images[0]}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <FavoriteButton recipe={recipe} />
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mt-2">
              {recipe.title}
            </h2>
          </div>
          <p className="mt-2">
            <FontAwesomeIcon icon={faUtensils} /> Prep:{" "}
            {convertToHours(recipe.prep)}{" "}
          </p>
          <p>
            <FontAwesomeIcon icon={faKitchenSet} /> Cook:{" "}
            {convertToHours(recipe.cook)}
          </p>
          <p>
            <FontAwesomeIcon icon={faSpoon} /> Total:{" "}
            {convertToHours(recipe.prep + recipe.cook)}
          </p>
          <Link href={`/recipeDetails/${recipe._id}`} className="mt-4">
            <button>View Recipe</button>
          </Link>
        </div>
      </li>
    </>
  )
}