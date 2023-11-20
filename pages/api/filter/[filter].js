/* eslint-disable */

import { getByAggregation } from "../../../utils/mongodb-utils";

export default async function handler(req, res){
    // const { filter, sort } = req.query;

    // console.log('filter:', filter);
    // console.log('sort:', sort);

    const filterVal = req.query.filter;

    // Split the query string by '&'
    const queryParams = filterVal.split('&');
    
    let filterObject, searchTitleQuery;
    let sortingObject = 'published(oldest)'

    queryParams.forEach(param => {
        if (param.startsWith('search=')) {
            // Extract the value of 'filter' and decode it
            const filterValue = decodeURIComponent(param.split('=')[1]);
            // Parse the 'filter' value as JSON
            searchTitleQuery = JSON.parse(filterValue);
        }
        if (param.startsWith('filter=')) {
        // Extract the value of 'filter' and decode it
        const filterValue = decodeURIComponent(param.split('=')[1]);
        // Parse the 'filter' value as JSON
        filterObject = JSON.parse(filterValue);
        } else if (param.startsWith('sorting=')) {
        // Extract the value of 'sorting' and decode it
        const sortingValue = decodeURIComponent(param.split('=')[1]);
    
        // Parse the 'sorting' value as JSON
        sortingObject = JSON.parse(sortingValue);
        }
    });
    console.log('titleQuery:',searchTitleQuery)
    console.log('sortingObj: ',sortingObject)
    console.log('filterObject: ',filterObject)

    if (req.method === 'GET') {

        function sortingByFunction(sortingBy) {
            const sortingOptions = {
              default: { _id: 1 },
              'published(latest)': { published: -1 },
              'published(oldest)': { published: 1 },
              'prepTime(Ascending)': { prep: -1 },
              'prepTime(Descending)': { prep: 1 },
              'cookTime(Ascending)': { cook: -1 },
              'cookTime(Descending)': { cook: 1 },
            };
        
            // Use the sortingBy value to get the corresponding sorting object
            return sortingOptions[sortingBy]  // Default to {_id: 1} if sortingBy is not matched
        }

        // Build the aggregation pipeline dynamically based on the filterObject
        let aggregationPipeline = [];

        //Create a sortinng object in a the pipeline
        aggregationPipeline.push({$sort: sortingByFunction(sortingObject)})

        if (searchTitleQuery){
            aggregationPipeline.push(
                {$match: {
                    title: {
                        $regex: new RegExp(searchTitleQuery, "i")
                }}}
            )
        } else {
            // Convert the string to an integer if numberOfSteps is present
            const numberOfSteps = filterObject.numberOfSteps ? parseInt(filterObject.numberOfSteps) : null;
            
            // Create an array of ingredients from the filterByIngredients property
            const ingredientsArray = filterObject.filterByIngredients ? filterObject.filterByIngredients.split(' ') : [];

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