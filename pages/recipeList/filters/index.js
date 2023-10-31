import { useEffect } from "react";
import Filtering from "../../../components/filtering/allFilter";
import { getCategories } from "../../../utils/mongodb-utils";

export async function getServerSideProps() {

  try {
    const recipeDocuments = await getCategories(
      'categories',
    )
    const categoriesArr = recipeDocuments[0].categories

    return { props: { categoriesArr: categoriesArr} }

  } catch (error) {
    console.error("Getting recipes failed");
    return {
      notFound: true,
    };
  }
}

export default function Filter({categoriesArr}) {

  useEffect(
    ()=>{
      async () => {
        const response = await fetch('/api/filter/filter')
        const data = await response.json()
        console.log(data)
      }
    }
  )

  return (
    <Filtering
        categoriesArr={categoriesArr}
    />
  )
}