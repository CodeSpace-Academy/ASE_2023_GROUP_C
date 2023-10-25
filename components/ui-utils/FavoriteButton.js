import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function FavoriteButton({recipe}) {
  const [isFavourate, setIsFavourate] = useState(false);

  function handleFavorite() {
    setIsFavourate( prevState => !prevState);
    console.log(isFavourate ? "unfavourite" : `favourite: ${recipe.title}`);
    console.log(recipe.title)
  }

  return (
    <button className=" absolute right-4 m-3 rounded-full w-14 text-center" onClick={handleFavorite}>
      {isFavourate ? (

        <FontAwesomeIcon className=' fill-current text-red-500' icon={faHeart} />
      ) : (
          <FontAwesomeIcon icon={faHeart} />
      )}
    </button>
  );
}