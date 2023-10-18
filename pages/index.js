import React from 'react';
import Link from 'next/link';
import RecipeHomePage from '../components/home-page/home-page';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function HomePage() {
  const {user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <div>

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