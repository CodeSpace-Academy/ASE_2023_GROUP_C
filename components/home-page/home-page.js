import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPizzaSlice, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function RecipeHomePage() {
  const element = <FontAwesomeIcon icon={faCoffee} />;
  const element2 = <FontAwesomeIcon icon={faPizzaSlice} />
  const element3 = <FontAwesomeIcon icon={faUser} />

  return (
    <div className="bg-gray-200 p-4 flex">
      <div className="w-1/2">
        {/* Left column for image */}
        <Image
          src="/images/sr-cook-book.png"
          alt="Rendo Sando Cook Book Image"
          width={610}
          height={100}
        />
      </div>
      <div className="w-1/2 p-4">
        {/* Right column for content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to The Recipe App {element}</h1>
          <div className="flex justify-center space-x-4">
            <Link href="/api/auth/login">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Login {element3}</button>
            </Link>
            <Link href="/recipe-list/">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Recipes {element2}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeHomePage;
