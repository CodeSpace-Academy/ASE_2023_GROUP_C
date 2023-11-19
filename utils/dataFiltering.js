/*eslint-disable*/

export const aggregationPipelineForaTags = [
    {
      $project: {
        tags: true,
      },
    }, {
      $unwind: {
        path: '$tags',
        preserveNullAndEmptyArrays: false,
      },
    }, {
      $group: {
        _id: null,
        uniqueTags: {
          $addToSet: '$tags',
        },
      },
    },
];

/**
 * Returns a sorting object based on the provided sorting option.
 *
 * @param {string} sortingBy - The sorting option to determine the sorting order.
 *   Possible values are:
 *   - 'default': Default sorting by _id in ascending order.
 *   - 'published(latest)': Sorting by published date in descending order (latest first).
 *   - 'published(oldest)': Sorting by published date in ascending order (oldest first).
 *   - 'prepTime(Ascending)': Sorting by preparation time in ascending order.
 *   - 'prepTime(Descending)': Sorting by preparation time in descending order.
 *   - 'cookTime(Ascending)': Sorting by cooking time in ascending order.
 *   - 'cookTime(Descending)': Sorting by cooking time in descending order.
 *
 * @returns {Object} - A sorting object representing the specified sorting option.
 *   If the provided sortingBy value does not match any option, the default {_id: 1} is returned.
 *
 * @example
* const sortingOption = sortingByFunction('published(latest)');
* // Returns { published: -1 }
*/
export function sortingByFunction(sortingBy) {
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
   return sortingOptions[sortingBy] || sortingOptions.default;
}

/**
 * Builds the aggregation pipeline for filtering based on the provided filterObject.
 *
 * @param {Array} aggregationPipeline - The existing aggregation pipeline array.
 * @param {Object} filterObject - The filterObject containing criteria for filtering.
 * @returns {Array} - The modified aggregation pipeline array with added match stages.
 *
 * @example
* const aggregationPipeline = [];
* const filterObject = {
*   numberOfSteps: 5,
*   categories: ['Dessert'],
*   tags: ['Vegetarian', 'Healthy'],
*   filterByIngredients: ['tomato' 'onion' 'garlic'],
* };
*/

export function buildAggregationPipelineForFilter(aggregationPipeline, filterObject) {

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

    return aggregationPipeline;
}

/**
 * Builds the aggregation pipeline for searching based on the provided searchTitleQuery.
 *
 * @param {Array} aggregationPipeline - The existing aggregation pipeline array.
 * @param {string} searchTitleQuery - The title query for searching.
 * @returns {Array} - The modified aggregation pipeline array with added match stages.
 *
 * @example
* const aggregationPipeline = [];
* const searchTitleQuery = 'spaghetti cheese';
*/

export function buildAggregationPipelineForSearch(aggregationPipeline, searchTitleQuery) {
    aggregationPipeline.push({
        $match: {
            title: {
                $regex: new RegExp(searchTitleQuery, "i")
            }
        }
    });
    return aggregationPipeline
}