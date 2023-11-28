import { getAllRecipesByFind } from '../../../utils/mongodb-utils';

export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method === 'GET') {
    // Extract the user's search query from the request's query parameters
    const userQuery = req.query.searchQuery;

    // Create a regular expression pattern for a case-insensitive search
    const regexPattern = new RegExp(`.*${userQuery}.*`, 'i');

    // Fetch recipes from the database that match the search query
    const recipes = await getAllRecipesByFind(
      'recipes', // Collection name
      { _id: -1 }, // Sort by _id in descending order
      2, // Limit the number of results to 2
      {
        title: { $regex: regexPattern }, // Match recipes with titles that contain the search query
      },
    );

    // Respond with a 200 status and the fetched recipes as a JSON object
    res.status(200).json({ message: recipes });
  }
}
