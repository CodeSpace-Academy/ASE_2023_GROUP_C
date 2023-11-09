import { getAllRecipes } from '../../../utils/mongodb-utils';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const recipeDocuments = await getAllRecipes(
                'recipes',
                {_id: -1},
                1,
            )
            res.status(200).json({message: recipeDocuments})
        } catch (error) {
            res.status(500).json({message: 'Getting recipes failed'})
        }
    }
}
