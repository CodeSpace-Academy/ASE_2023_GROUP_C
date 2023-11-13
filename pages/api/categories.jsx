import { getCategories } from '../../utils/mongodb-utils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const recipeDocuments = await getCategories('categories');
      const categoriesArr = recipeDocuments[0].categories;
      res.status(200).json({ message: categoriesArr });
    } catch (error) {
      res.status(500).json({ message: 'Getting recipes failed' });
    }
  }
}
