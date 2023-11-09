import { getRecipes } from '../../../utils/mongodb-utils';

export default async function handler(req, res) {
  const numOfIntruction = 10;
  const category = 'Vegetable';

  const byInstruction = { instructions: { $size: numOfIntruction } };
  const byCategories = { category };

  const filterObject = {
    ...byInstruction, // Add byInstruction object properties to filterObject
    ...byCategories, // Add byCategories object properties to filterObject
  };

  if (req.method === 'GET') {
    try {
      const recipeDocuments = await getRecipes(
        'recipes',
        { _id: -1 },
        1,
        filterObject,
      );
      res.status(200).json({ message: recipeDocuments });
    } catch (error) {
      res.status(500).json({ message: 'Getting recipes failed' });
    }
  }
}
