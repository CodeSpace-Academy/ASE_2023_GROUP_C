//api rout to send info to mongo db
//create state variable to keep track of which recipes are marked as favorites.
//add an onClick handler to the favorite button.
//pass the toggleFavorite function as a prop to each recipe item component so that it can be called when the favorite button is clicked.
//storage

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button onClick={onClick} className={isFavorite ? "favorite" : "not-favorite"}>
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}
