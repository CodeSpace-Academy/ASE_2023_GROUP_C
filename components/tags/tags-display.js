import React from "react";
import styles from './tags-list.module.css';

export default function TagsDisplay(prop) {
  const { recipe } = prop
  return (
    <div>
      <div className='flex mb-4 gap-8'>
        {recipe.tags.map((tag) => (
          <div key={tag} className=''>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
