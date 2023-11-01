import { Fragment, useEffect, useState } from "react";
import { getCategories } from "../../../utils/mongodb-utils";
import Overlay from "../../../components/ui-utils/overlay/overlay";

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

export default function Filter({ categoriesArr }) {
  const [selectedOption, setSelectedOption] = useState(""); // Step 1
  const [numberOfSteps, setNumberOfSteps] = useState(""); // Add this state variable


  return (
    <Fragment>
      <Overlay
        categoriesArr={categoriesArr}
      />
      <div>{numberOfSteps}</div>
    </Fragment>
  );
}