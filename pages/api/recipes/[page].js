// import { connectToDb, getAllRecipes } from "@/utils/mongodb-utils";

import { connectToDb, getAllRecipes } from "../../../utils/mongodb-utils";

export default async function handler(req, res) {
    let client;
    
    try {
        client = await connectToDb()
    } catch(error) {
        res.status(500).json({message: 'Database connection failed'})
        return 
    }

    if (req.method === 'GET') {
        try {
            const recipeDocuments = await getAllRecipes(
                client,
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
