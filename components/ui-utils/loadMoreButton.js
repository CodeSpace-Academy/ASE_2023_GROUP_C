import React from "react";

export default function LoadMoreButton({ onClick, remainingRecipes }) {
  return (
    <div className="my-4">
      <button
        onClick={onClick}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded cursor-pointer"
        style={{ fontSize: "15px" }}
      >
        More Recipes ({remainingRecipes} left)
      </button>
    </div>
  );
}
