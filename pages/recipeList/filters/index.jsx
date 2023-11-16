import { getByAggregation, getCategories } from '../../../utils/mongodb-utils';
import Overlay from '../../../components/ui-utils/overlay/overlay';

export async function getServerSideProps() {
  // This is pattern to use in the aggregation method in mongodb to fetch a list of tags in
  const patternForTags = [
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

  try {
    const recipeDocuments = await getCategories(
      'categories',
    );
    const uniqueTags = await getByAggregation(
      'recipes',
      patternForTags,
    );
    const arrayOfUnigueTags = uniqueTags[0].uniqueTags;

    const categoriesArr = recipeDocuments[0].categories;

    return {
      props: {
        categoriesArr,
        arrayOfUnigueTags,
      },
    };
  } catch (error) {
    console.error('Getting recipes failed');
    return {
      notFound: true,
    };
  }
}

export default function Filter({ categoriesArr, arrayOfUnigueTags }) {
  console.log(arrayOfUnigueTags);

  return (
    <Overlay
      categoriesArr={categoriesArr}
      arrayOfUnigueTags={arrayOfUnigueTags}
    />
  );
}