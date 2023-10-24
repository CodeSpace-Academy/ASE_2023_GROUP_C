import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function FavouriteRecipes() {
 

  return (
    <div >
       <Link href='/recipe-list'>
         <FontAwesomeIcon icon={faChevronLeft} size='xl' className="text-white p-2" />
        </Link>
        
      <h1 className="text-white p-2">Your Favorite Recipes</h1>
      <h2 className="text-white p-2">Hellooo</h2>
    </div>
  );
}
