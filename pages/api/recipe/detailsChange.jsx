// Import MongoDB utility functions
import {
  insertDocument,
  lookforDocument,
  updateUsersList,
} from '../../utils/mongodb-util';

// API route handler for updating or inserting a recipe into MongoDB
export default async function handler(req, res) {
  // Destructure values from the request body
  const { description, instructions } = req.body;

  // Static username (To-Do: make it dynamic based on the user)
  const username = 'The User change'; // To-Do: make this a dynamic value of a user.

  // Check if the request method is POST
  if (req.method === 'POST') {
    try {
      // Check if the user already exists in the database
      const userExist = await lookforDocument({ userName: username });

      if (userExist) {
        // User exists, update recipe
        const updatedRecipe = { description, instructions };
        await updateUsersList('users-list', username, updatedRecipe);
        res.status(201).json({ message: updatedRecipe });
      } else {
        // User does not exist, insert new recipe
        const newRecipe = {
          userName: username,
          userList: [{ description, instructions }],
        };

        const recipeDocuments = await insertDocument('users-list', newRecipe);

        // Assign the generated _id to the recipe and respond with success
        newRecipe.userList[0]._id = recipeDocuments.insertedId;
        res.status(201).json({ message: newRecipe.userList[0] });
      }
    } catch (error) {
      // Respond with a server error if an exception occurs
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    // Respond with a Method Not Allowed status for non-POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}