import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function FavoriteButton({recipe}) {
  const [isFavourate, setIsFavourate] = useState(false);
  

  function handleFavorite() {
    setIsFavourate((prevState) => !prevState);
    console.log(isFavourate ? "unfavourite" : `favourite: ${recipe.title}`);
  
    fetch('/api/favourite', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
   //Favourite button
    <button
  className={`m-3 rounded-full w-14 h-14 flex items-center justify-center ${
    isFavourate ? 'bg-red-100' : 'bg-red'
  }`}
  onClick={handleFavorite}
>
  {isFavourate ? (
    <FontAwesomeIcon className='text-red-500' icon={faHeart} />
  ) : (
    <FontAwesomeIcon icon={faHeart} />
  )}
</button>

  );
}