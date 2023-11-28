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
