import { sortingByFunction } from "../../utils/filteringUtils";
import { fetchRecipes } from "../../utils/mongodb-utils";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const recipeDocuments = await fetchRecipes(
            'users-list',
            sortingByFunction(sortBy),
            page,
            { userName: user }
        );

        const currentDocumentSize = await getDocumentSize('users-list', { userName: user })
        const favoriteRecipe = recipeDocuments[0].userList

        res.status(200).json({ message: {  
            favoriteRecipe, 
            currentDocumentSize
        } });
      } catch (error) {
        res.status(500).json({ message: 'Getting recipes failed' });
      }
    }
  }