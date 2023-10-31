import { getRecipeDetails } from "../../../utils/mongodb-utils";

export default async function handler(req, res){
    const recipeId = req.query.recipeDetails;

    if (req.method === 'GET') {
        try {
            const recipeDocuments = await getRecipeDetails(
                'recipes',
                {_id: recipeId},
            )
            res.status(200).json({message: recipeDocuments})
        } catch (error) {
            res.status(500).json({message: 'Getting recipes failed'})
        }
    } 
}