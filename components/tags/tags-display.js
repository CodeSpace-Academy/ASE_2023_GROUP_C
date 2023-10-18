import React from "react";

export default function TagsDisplay(prop) {
  const { recipe } = prop;

  return (
    <div>
      <div className="max-w-full p-4">
        {recipe.tags.map((tag) => (
          <span key={tag} className="bg-blue-500 text-white px-2 py-1 m-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
