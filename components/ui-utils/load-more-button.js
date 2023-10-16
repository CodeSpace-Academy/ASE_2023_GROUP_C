import React from "react";

export default function LoadMoreButton({ onClick, remainingRecipes }) {
  return (
    <div className="my-4">
      <button
        onClick={onClick}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded cursor-pointer"
      >
        Load More Recipes ({remainingRecipes} left)
      </button>
    </div>
  );
}
