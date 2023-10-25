import { connectToDb, insertDocument } from "../../utils/mongodb-utils";

export default async function handler(req, res) {
  const recipe = req.body

    let client;
    
  try {
    client = await connectToDb()
  } catch(error) {
  res.status(500).json({message: 'Database connection failed'})
    return 
  }
  const favouredRecipe = {
    userName: 'The User Gang',
    userList: recipe
  }

  if (req.method === 'POST') {
    try {
      const recipeDocuments = await insertDocument(
        client,
        'users-list',
        favouredRecipe,
      )
      favouredRecipe._id = recipeDocuments.insertedId
      res.status(201).json({message: favouredRecipe})
    } catch (error) {
      res.status(500).json({message: 'Getting recipes failed'})
    }
  }
}