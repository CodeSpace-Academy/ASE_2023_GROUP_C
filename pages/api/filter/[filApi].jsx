import { getRecipes } from '../../../utils/mongodb-utils';


const express = require('express');
const mongoose = require('mongoose');


const app = express();

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/dev-dummy', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const recipeSchema = new mongoose.Schema({

});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Define the API route
app.get('/api/sortRecipesBySteps', async (req, res) => {
  try {
    const sortedRecipes = await Recipe.aggregate([
      {
        $addFields: {
          numInstructions: { $size: '$instructions' }
        }
      },
      {
        $sort: { numInstructions: 1 }
      }
    ]);

    res.json(sortedRecipes);
  } catch (error) {
    console.error('Error in sorting recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});