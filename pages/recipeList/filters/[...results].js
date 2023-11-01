import { useRouter } from "next/router";
import RecipeList from "../../../components/recipeList/recipeList";
import { getRecipes } from "../../../utils/mongodb-utils";

export async function getServerSideProps({query}) {
  const { results = [] } = query
  let numOfIntruction;Y
  
  const category = 'Vegetable'

  console.log(results[1])

  const byInstruction = { "instructions": { $size: 4} }
  
  const byCategories = {"category": category}

  const filterObject = {
      ...byInstruction, // Add byInstruction object properties to filterObject
    };

  try {
      const recipeDocuments = await getRecipes(
          'recipes',
          {_id: -1},
          1,
          filterObject
      )
      return { props: { recipeDocuments } }
  } catch (error) {
      console.error("Getting recipes failed");
      return {
        notFound: true,
      };
  }
}

export default function RecipeCards(props) {
  const { recipeDocuments } = props;
  // const router = useRouter()

  // const { results = [] } = router.query
  // console.log(results)

  return (
    <div>
      <RecipeList recipes={recipeDocuments} totalRecipeInDb={0} />
    </div>
  );
}