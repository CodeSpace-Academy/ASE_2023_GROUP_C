import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPizzaSlice, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function RecipeHomePage() {
  return (
    <div className="p-4 flex max-h-screen">
      <style>
        {`
          body {
            background-color: #111827; // Setting the background color
          }
        `}
      </style>
      <div className="w-1/2 rounded-2xl">
        {/* Left column for the image */}
        <Image
          src="/images/sr-cook-book.png"
          alt="Rendo Sando Cook Book Image"
          width={620}
          height={100}
          className='rounded-3xl' // Adding rounded corners to the image
        />
      </div>
      <div className="w-1/2 p-4">
        {/* Right column for content */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6"> {/* Heading with increased text size */}
            Welcome to The Recipe App <FontAwesomeIcon icon={faCoffee} /> {/* Adding a coffee cup icon */}
          </h1>
          <div className="flex justify-center space-x-4">
            <Link href="/api/auth/login">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"> {/* Styling for the Login button */}
                Login <FontAwesomeIcon icon={faUser} /> {/* Adding a user icon */}
              </button>
            </Link>
            <Link href="/recipeList/1">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover-bg-green-700 ml-4"> {/* Styling for the Recipes button with margin */}
                Recipes <FontAwesomeIcon icon={faPizzaSlice} /> {/* Adding a pizza slice icon */}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeHomePage;
