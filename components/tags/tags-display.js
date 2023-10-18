import React from "react";

export default function TagsDisplay(prop) {
  const { recipe } = prop;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 rounded bg-blue-500 text-white">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
