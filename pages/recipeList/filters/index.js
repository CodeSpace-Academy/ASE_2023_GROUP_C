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

  // Step 2: Create a function to update the selected option
  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/filter/filter');
        const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.error("Fetching data from the API failed");
      }
    };

    fetchData();

  }, []);

  return (
    <Fragment>
      <Overlay
        categoriesArr={categoriesArr}
        selectedOption={selectedOption} // Pass the selected option and the update function
        onOptionChange={handleOptionChange} // Step 2
      />
    </Fragment>
  );
}