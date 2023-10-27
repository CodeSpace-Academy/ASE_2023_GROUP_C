import { updateUsersList } from "../../utils/mongodb-utils";

export default async function handler(req, res) {
  const recipe = req.body
  const username = 'The User 1'

  const favouredRecipe = {
    userName: 'The User 1',
    userList: []
  }

  if (req.method === 'POST') {
    try {
      const recipeDocuments = await updateUsersList(
        'users-list',
        username,
        recipe
      )

      res.status(201).json({message: recipe})
    } catch (error) {
      res.status(500).json({message: 'Getting recipes failed'})
    }
  }
}