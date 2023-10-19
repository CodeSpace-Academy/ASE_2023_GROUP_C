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
            background-color: #111827; 
          }
        `}
      </style>
      <div className="w-1/2">
        {/* Left column for image */}
        <Image
          src="/images/sr-cook-book.png"
          alt="Rendo Sando Cook Book Image"
          width={620}
          height={100}
        />
      </div>
      <div className="w-1/2 p-4">
        {/* Right column for content */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6"> {/* Increased text size */}
            Welcome to The Recipe App <FontAwesomeIcon icon={faCoffee} />
          </h1>
          <div className="flex justify-center space-x-4">
            <Link href="/api/auth/login">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"> {/* Increased button size */}
                Login <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
            <Link href="/recipe-list/1">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover-bg-green-600 ml-4"> {/* Increased button size and added margin */}
                Recipes <FontAwesomeIcon icon={faPizzaSlice} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeHomePage;
