import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

export default function TagsDisplay(prop) {
  const { recipe } = prop;

  return (
    <div>
      <h2 className=" text-2xl font-bold">Tags:</h2>
      <div className='flex flex-wrap mb-4 gap-8 mt-2 '>
        {recipe.tags.map((tag) => (
          <div key={tag} className='border rounded-lg border-sky-500 p-2 hover:bg-sky-700'>
            <FontAwesomeIcon icon={faTags}/>{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
