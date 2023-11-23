// eslint-disable-next-line no-unused-vars
const handleRecipeEdit = async (editedRecipe) => {
  try {
    const response = await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedRecipe),
    });

    if (response.ok) {
      // Handle success, e.g., update state or show a success message
    } else {
      // Handle error, e.g., show an error message
      const data = await response.json();
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
