export default function RecipeList(props) {
    const { recipes } = props;
  
    if (!recipes) return <p>Loading...</p>;
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 rounded-lg shadow-md">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <img
                className="w-40 h-40 object-cover rounded-md"
                src={recipe.images[0]}
                alt={recipe.title}
              />
              <p className="mt-2">{recipe.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  