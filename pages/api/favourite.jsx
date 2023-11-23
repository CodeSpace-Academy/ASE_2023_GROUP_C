/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  insertDocument,
  lookforDocument,
  updateUsersList,
} from '../../utils/mongodb-utils';

export default async function handler(req, res) {
  const recipe = req.body;
  const username = 'The User 1'; // To-Do: make this a dynamic value of a user. This value must nbe set according to how the user is.

  if (req.method === 'POST') {
    const userExist = await lookforDocument({ userName: username });

    if (userExist) {
      try {
        const recipeDocuments = await updateUsersList('users-list', username, {
          $addToSet: { userList: recipe },
        });
        res.status(201).json({ message: recipe });
      } catch (error) {
        res.status(500).json({ message: 'Getting recipes failed' });
      }
    } else {
      const favouredRecipe = {
        userName: username,
        userList: [recipe],
      };
      try {
        const recipeDocuments = await insertDocument(
          'users-list',
          favouredRecipe,
        );
        favouredRecipe._id = recipeDocuments.insertedId;
        res.status(201).json({ message: favouredRecipe });
      } catch (error) {
        res.status(500).json({ message: 'Getting recipes failed' });
      }
    }
  }
}