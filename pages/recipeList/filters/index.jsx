import { getCategories } from '../../../utils/mongodb-utils';
import Overlay from '../../../components/ui-utils/overlay/overlay';

export async function getServerSideProps() {
  try {
    const recipeDocuments = await getCategories('categories');
    const categoriesArr = recipeDocuments[0].categories;

    return { props: { categoriesArr } };
  } catch (error) {
    console.error('Getting recipes failed');
    return {
      notFound: true,
    };
  }
}

export default function Filter({ categoriesArr }) {
  return (
    <div>
      <Overlay categoriesArr={categoriesArr} />
    </div>
  );
}
