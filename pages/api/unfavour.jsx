/* eslint-disable no-unused-vars */
import { updateUsersList } from '../../utils/mongodb-utils';

export default async function handler(req, res) {
  const recipe = req.body;
  const username = 'The User 1'; // To-Do: make this a dynamic value of a user. This value must nbe set according to how the user is.

  if (req.method === 'POST') {
    try {
      const removeRecipe = await updateUsersList(
        'users-list',
        username,
        { $pull: { userList: recipe } }, // Removes the recipe from the 'users-list' collection
      );

      res.status(201).json({ message: recipe });
    } catch (error) {
      res.status(500).json({ message: 'Getting recipes failed' });
    }
  }
}
