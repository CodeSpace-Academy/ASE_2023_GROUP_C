import {
  insertDocument,
  lookforDocument,
  updateUsersList,
} from "../../utils/mongodb-utils";

// Define an API route handler
export default async function handler(req, res) {
  // Destructure values from the request body
  const { description, instructions, _id } = req.body;

  // Static username for (To-Do: make it dynamic based on the user)
  const username = 'The User change'; // To-Do: make this a dynamic value of a user. This value must be set according to how the user is.

  // Check if the request method is POST
  if (req.method === 'POST') {
    // Check if the user already exists in the database
    const userExist = await lookforDocument({ userName: username });

    // If the user exists
    if (userExist) {
      try {
        // Create an updatedRecipe object with the provided description and instructions
        const updatedRecipe = {
          description,
          instructions,
        };

        // Update the user's recipe list in the 'users-list' collection

        // Respond with a success status and the updatedRecipe object
        res.status(201).json({ message: updatedRecipe });
      } catch (error) {
        // Respond with a server error if updating the recipe fails
        res.status(500).json({ message: 'Updating recipe failed' });
      }
    } else {
      // If the user does not exist
      const newRecipe = {
      // Create a newRecipe object with the username and a userList array containing a recipe object
        userName: username,
        userList: [
          {
            description,
            instructions,
          },
        ],
      };

      try {
        // Insert the newRecipe into the 'users-list' collection
        const recipeDocuments = await insertDocument('users-list', newRecipe);

    // Assign the generated _id to the recipe and respond with a success status and the new recipe
        newRecipe.userList[0]._id = recipeDocuments.insertedId;
        res.status(201).json({ message: newRecipe.userList[0] });
      } catch (error) {
        // Respond with a server error if adding the new recipe fails
        res.status(500).json({ message: 'Adding new recipe failed' });
      }
    }
  }
}
