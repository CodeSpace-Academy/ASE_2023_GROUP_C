import React from 'react';
import Link from 'next/link';
import RecipeHomePage from '../components/home-page/home-page';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CategoryFilter from '../components/category-filter/category-filter';

export default function HomePage() {
  const {user, error, isLoading } = useUser()

if (isLoading) return <div className=' min-h-screen items-center justify-center bg-slate-900 flex'><FontAwesomeIcon icon= {faSpinner} spinPulse /></div>

  if (error) return <div>{error.message}</div>

  return (
    <div>
      <CategoryFilter/>

      {
        user && 
        <> 
        <div>Welcome {user.name}</div>
        <h1>
          <Link href="/api/auth/logout" legacyBehavior><a>Logout</a></Link>
        </h1>
        </>
      }
      <RecipeHomePage />
    </div>
  );
};