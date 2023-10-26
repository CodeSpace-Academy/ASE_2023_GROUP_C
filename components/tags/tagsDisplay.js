import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

export default function TagsDisplay(prop) {
  const { recipe } = prop;

  // Check if recipe.tags is available, otherwise display an error message
  if (!recipe.tags || recipe.tags.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold">Tags:</h2>
        {/* Display an error message if tags are not available */}
        <div className="text-red-500">Failed to load tags</div>
      </div>
    );
  }

  return (
    <div>
  {/* Display a heading for the tags */}
  <h2 className="text-2xl font-bold">Tags:</h2>
  <div className="flex flex-wrap mb-4 gap-8 mt-2">
    {/* Map through each tag and display them in separate div elements */}
    {recipe.tags.map((tag) => (
      <div key={tag} className="border rounded-lg border-sky-500 p-2 hover:bg-sky-700">
        {/* Display a tags icon (e.g., a small tag icon) */}
        <FontAwesomeIcon icon={faTags} />
        {/* Display the actual tag text */}
        {tag}
      </div>
    ))}
  </div>
</div>

  );
}
