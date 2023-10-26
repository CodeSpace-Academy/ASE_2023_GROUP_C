import { getRecipeDetails } from "../../../utils/mongodb-utils";

export default async function handler(req, res){
    const recipeId = req.query.recipeDetails;

    let client;

    try {
        client = await connectToDb()
    } catch(error) {
        res.status(500).json({message: 'Database connection failed'})
        return 
    }

    if (req.method === 'GET') {
        try {
            const recipeDocuments = await getRecipeDetails(
                client,
                'recipes',
                {_id: recipeId},
            )
            res.status(200).json({message: recipeDocuments})
        } catch (error) {
            res.status(500).json({message: 'Getting recipes failed'})
        }
    } 
}