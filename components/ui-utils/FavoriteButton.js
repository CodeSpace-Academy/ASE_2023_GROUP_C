import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ConfirmationDialog from "../customPrompt/prompt";

/**
 * FavoriteButton component for adding and removing recipes from favorites.
 *
 * @param {Object} props - The component's properties.
 * @param {Object} props.recipe - The recipe to be added or removed from favorites.
 *
 * @returns {JSX.Element} The rendered FavoriteButton component.
 */
export default function FavoriteButton(props) {
  const { recipe } = props;
  const [isFavourate, setIsFavourate] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  /**
   * Handle the confirmation of removing the recipe from favorites.
   */
  const handleConfirm = () => {
    setMessage('Recipe removed!'); // Set the message
    setIsFavourate(false);
    setIsDialogOpen(false);
  };

  /**
   * Handle the cancellation of the confirmation dialog.
   */
  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  /**
   * Handle adding or removing the recipe from favorites and show a confirmation dialog.
   */
  function handleFavorite() {
    setIsFavourate(true);

    if (isFavourate) {
      setIsDialogOpen(true);
    }

    fetch('/api/favourite', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    // Favourite button
    <div>
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

      {isDialogOpen && (
        <ConfirmationDialog
          message="Are you sure you want to delete?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <p>{message}</p> {/* Display the message here */}
    </div>
  );
}