import { connectToDb, getCategories } from "../../utils/mongodb-utils";

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
            const recipeDocuments = await getCategories(
                client,
                'categories',
            )
            const categoriesArr = recipeDocuments[0].categories
            res.status(200).json({message: categoriesArr})
        } catch (error) {
            res.status(500).json({message: 'Getting recipes failed'})
        }
    }
}