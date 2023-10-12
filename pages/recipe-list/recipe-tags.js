// export default function recipeTags(){




//     return (
//         <div className="recipe-tags">
//             {tags.map((tag )=> (
//                 <span key={tag} className="tag">
//                     {tag}
//                 </span>
//            ) )}
              

//         </div>
//     );
// };


// import React from 'react';

// // Function to format recipe tags
// function formatRecipeTags(tags) {
//   if (!tags || tags.length === 0) {
//     return 'No tags';
//   }

//   // Assuming 'tags' is an array of tag strings
//   const formattedTags = tags.map((tag) => `#${tag}`).join(', ');

//   return formattedTags;
// }

// export default function RecipePage(props) {
//   const { recipe } = props;

//   if (!recipe) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>{recipe.title}</h1>
//       <p>{recipe.description}</p>

//       <div>
//         <strong>Tags:</strong> {formatRecipeTags(recipe.tags)}
//       </div>

//       {/* Rest of the recipe page content */}
//     </div>
//   );
// }



import React from 'react';

function Recipe({ recipe }) {
  const formattedTags = tags(recipe.tags);

  // Update the recipe document in your database with the formatted recipe tags.
  // ...

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <ul>
        {formattedTags.split(',').map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;