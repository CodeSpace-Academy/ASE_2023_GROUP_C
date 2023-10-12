export default function RecipeList(props) {
    const { recipes } = props;
  
    if (!recipes) return <p>Loading...</p>;
  
    return (
      <div>
        
        <h1>Recipe List</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <h2>{recipe.title}</h2>
              <img
                className='w-40 h-40'
                src={recipe.images[0]}
                alt={recipe.title}
              />
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  