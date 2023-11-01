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

  // Step 2: Create a function to update the selected option
  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };

  

  return (
    <Fragment>
      <Overlay
        categoriesArr={categoriesArr}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
        numberOfSteps={numberOfSteps} // Pass the number of steps as a prop
      />
      <div>{numberOfSteps}</div>
    </Fragment>
  );
}