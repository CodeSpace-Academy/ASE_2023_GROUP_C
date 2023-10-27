import React from 'react';
import Link from 'next/link';
import RecipeHomePage from '../components/homePage/homePage';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
 
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <div className=" min-h-screen items-center justify-center bg-slate-900 flex">
        <FontAwesomeIcon icon={faSpinner} spinPulse />
      </div>
    );

  if (error) return <div>{error.message}</div>;;

  return (
    <div>
      <RecipeHomePage />
      {user && (
        <>
          <div className="text-2xl font-bold text-white mb-6" >User: {user.name}</div>
            <Link href="/api/auth/logout" legacyBehavior>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Logout</button>
            </Link>
        </>
      )}
    </div>
  );
}
