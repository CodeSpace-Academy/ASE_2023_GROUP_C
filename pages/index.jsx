import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import RecipeHomePage from '../components/homePage/homePage';

export default function HomePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className=" min-h-screen items-center justify-center flex">
        <FontAwesomeIcon icon={faSpinner} spinPulse />
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <RecipeHomePage />
      {user && (
        <>
          <div className="text-2xl font-bold text-white mb-6 ml-5">
            <FontAwesomeIcon icon={faUser} />
            {user.name}
          </div>
          <Link href="/api/auth/logout" legacyBehavior>
            <button type="button" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-6 ml-5">
              Logout
              <FontAwesomeIcon icon={faUser} />
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
