import user from '../../utils/dummyUser';
import { sortingByFunction } from '../../utils/filteringUtils';
import { fetchRecipes, getDocumentSize } from '../../utils/mongodb-utils';

export default async function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const sortBy = req.query.sortBy || 'default';

  if (req.method === 'GET') {
    try {
      const recipeDocuments = await fetchRecipes(
        'users-list',
        sortingByFunction(sortBy),
        page,
        { userName: user },
      );

      const currentDocumentSize = await getDocumentSize('users-list', { userName: user });
      const favoriteRecipes = recipeDocuments[0].userList;

      res.status(200).json({
        message: {
          favoriteRecipes,
          currentDocumentSize,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Getting recipes failed' });
    }
  }
}
