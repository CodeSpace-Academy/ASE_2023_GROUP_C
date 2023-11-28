export const pipelineForTags = [
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

// export default pipelineForTags;

export function sortingByFunction(sortingBy) {
  const sortingOptions = {
    default: {},
    'published(latest)': { published: 1 },
    'published(oldest)': { published: -1 },
    'prepTime(Ascending)': { prep: 1 },
    'prepTime(Descending)': { prep: -1 },
    'cookTime(Ascending)': { cook: 1 },
    'cookTime(Descending)': { cook: -1 },
    'numberOfSteps(Ascending)': { instructions: 1 },
    'numberOfSteps(Descending)': { instructions: -1 },
  };
  // Use the sortingBy value to get the corresponding sorting object
  return sortingOptions[sortingBy];
}

export function filteringObjectFunction(filter, search) {
  const mongoFilterObject = {};

  if (search){
    mongoFilterObject.title = { $regex: search, $options: 'i' }
  } else {
    if (filter.categories) {
      mongoFilterObject.category = { $in: [filter.categories] };
    }
    if (filter.tags) {
      mongoFilterObject.tags = { $in: [filter.tags] };
    }
    if (filter.numberOfSteps) {
      mongoFilterObject.instructions = {
        $size: parseInt(filter.numberOfSteps, 10),
      };
    }
    if (filter.filterByIngredients) {
      // The filterArray generate a list of object that searches in mongodb.
      const filterArray = filter.filterByIngredients
        .slice(1)
        .map((ingredient) => {
          const key = `ingredients.${ingredient}`;
          return { [key]: { $exists: true } };
        });

      if (filterArray.length > 0) {
        mongoFilterObject.$and = filterArray;
      }
    }
  }
  return mongoFilterObject
}