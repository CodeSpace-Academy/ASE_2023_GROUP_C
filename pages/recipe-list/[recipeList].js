import RecipeList from "../../components/recipe-list";
import { connectToDb, getAllRecipes } from "../../utils/mongodb-utils";

// export async function getStaticProps() {
//     const pageNumber = context.params.recipeList

//     let client = await connectToDb();
//     const recipeDocuments = await getAllRecipes(
//         client,
//         "recipes",
//         { _id: -1 },
//         pageNumber
//     );

//     return {
//         props: {
//         recipes: recipeDocuments,
//         },
//     };
// }

// export async function getStaticPaths() {
//     const pageNumber = context.query.recipeList

//     return {
//         paths: [
//             {
//             params: {
//                 name: [pageNumber],
//             },
//             }, 
//         ],
//         fallback: 'blocking',
//     }
// }

export async function getServerSideProps(context) {
    const pageNumber = context.query.recipeList;
    
    let client = await connectToDb();
    const recipeDocuments = await getAllRecipes(
        client,
        "recipes",
        { _id: -1 },
        pageNumber
    );

    return {
        props: {
        recipes: recipeDocuments,
        },
    };
}

export default function RecipeCards(props) {
  const { recipes } = props;

  return (
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
}