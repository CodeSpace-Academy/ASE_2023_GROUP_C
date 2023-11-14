/* eslint-disable */

import { getAllRecipes, getByAggregation } from "../../utils/mongodb-utils"

export default async function handler(req, res){
    
  if (req.method === 'POST') {

    let filterObject = {
        categories: "Dessert",
        filterByIngredients: "butter eggs sugar",
        numberOfSteps:"9",
        tags:"Nuts",
    }
    
    // Convert the string to an integer if numberOfSteps is present
    const numberOfSteps = filterObject.numberOfSteps ? parseInt(filterObject.numberOfSteps) : null;
    
    // Create an array of ingredients from the filterByIngredients property
    const ingredientsArray = filterObject.filterByIngredients ? filterObject.filterByIngredients.split(' ') : [];
    
    // Build the aggregation pipeline dynamically based on the filterObject
    let aggregationPipeline = [];
    
    // Match based on the provided criteria
    if (numberOfSteps !== null) {
        aggregationPipeline.push({
            $match: { instructions: { $size: numberOfSteps } }
        });
    }
    
    if (filterObject.categories) {
        aggregationPipeline.push({
            $match: { category: { $in: [filterObject.categories] } }
        });
    }
    
    if (filterObject.tags) {
        aggregationPipeline.push({
            $match: { tags: { $in: [filterObject.tags] } }
        });
    }
    
    if (ingredientsArray.length > 0) {
        const ingredientsMatch = ingredientsArray.map(ingredient => ({ [`ingredients.${ingredient}`]: { $exists: true } }));
        aggregationPipeline.push({
            $match: { $and: ingredientsMatch }
        });
    }
    
    try {

    const patternForTags = aggregationPipeline

    const uniqueTags = await getByAggregation(
        'recipes',
        patternForTags,
    );

    res.status(201).json({ message: uniqueTags });
    } catch (error) {
        res.status(500).json({ message: 'Getting recipes failed' })
    }
} 
}
