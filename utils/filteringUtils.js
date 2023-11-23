/* eslint-disable */

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
