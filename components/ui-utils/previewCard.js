import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils,
    faKitchenSet,
    faSpoon,
    faHeart,
   
  } from "@fortawesome/free-solid-svg-icons";

export default function PreviewCard (props){
    const { recipe } = props

    const [isFavourate, setIsFavourate] = useState(false);

    // Function to convert minutes to hours and minutes
    const convertToHours = (minutes) => {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
             return `${hours} hours ${remainingMinutes} minutes`;
    }
        return `${minutes} minutes`;
  };
    
     return(
       <li key={recipe._id}>
                 <div className=" relative bg-gray-800 p-4 rounded-lg transition hover:shadow-lg flex flex-col flex-wrap w-200 h-full">
                   <img
                     src={recipe.images[0]}
                     alt={recipe.title}
                     className="w-full h-48 object-cover rounded-md"
                   />
                   <button className=" absolute right-4 m-3 rounded-full w-14 text-center">
                     {isFavourate ? (
                       <FontAwesomeIcon icon={faHeart} />
                     ) : (
                       <FontAwesomeIcon icon={faHeart} />
                     )}
                   </button>
   
                   <div className=" flex justify-between ">
                     <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
                   </div>
                   <p className="mt-2">
                     <FontAwesomeIcon icon={faUtensils} /> Prep:{" "}
                     {convertToHours(recipe.prep)}{" "}
                   </p>
                   <p>
                     <FontAwesomeIcon icon={faKitchenSet} /> Cook:{" "}
                     {convertToHours(recipe.cook)}{" "}
                   </p>
                   <p>
                     <FontAwesomeIcon icon={faSpoon} /> Total:{" "}
                     {convertToHours(recipe.prep + recipe.cook)}{" "}
                   </p>
   
                   <Link href={`/recipe-details/${recipe._id}`} className=" mt-4">
                     <button>View Recipe</button>
                   </Link>
                 </div>
               </li>
     )
   }

