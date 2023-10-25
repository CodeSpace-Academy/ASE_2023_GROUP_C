import { connectToDb, insertDocument } from "../../utils/mongodb-utils";

export default async function handler(req, res) {
    let client;
    
    try {
      client = await connectToDb()
    } catch(error) {
    res.status(500).json({message: 'Database connection failed'})
    return 
  }
  
  const document = {

  }
  if (req.method === 'POST') {
    try {
      const recipeDocuments = await insertDocument(
        client,
        'users-list',
        document,
      )
      res.status(201).json({message: recipeDocuments})
    } catch (error) {
      res.status(500).json({message: 'Getting recipes failed'})
    }
  }
}