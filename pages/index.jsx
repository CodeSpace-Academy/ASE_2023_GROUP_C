import React, { Fragment } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="relative h-screen overflow-hidden bg-cover bg-center bg-fixed bg-hero">
        <div className="absolute top-0 left-0 w-full h-full " />

        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold">Welcome to The Recipe App</h1>
          <p className="mt-4 text-lg">
            This app allows you to search for recipes and save them in your
            favorite list!
          </p>
        </div>
      </div>

      <main className="py-16 text-white">
        <Link
          className="flex justify-center text-2xl hover:opacity-50 hover:underline"
          href="/recipes"
        >
          Visit Recipes
        </Link>

        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">
            The Recipe App: A Culinary Adventure
          </h2>
          <p className="mt-4 text-lg">
            The Recipe App is a culinary adventure that will take you on a
            journey around the world, introducing you to new and exciting
            flavors from every corner of the globe. With its extensive
            collection of recipes from both traditional and modern cuisines, The
            Recipe App has something for everyone, from the novice cook to the
            seasoned chef. But what really sets The Recipe App apart is its
            focus on unorthodox tastes. Whether youre looking for a dish that
            combines sweet and savory flavors, uses unusual ingredients, or
            offers a unique culinary experience, The Recipe App has you covered.
          </p>
        </section>
        <section className="container mx-auto px-4 pt-16 flex flex-col justify-center  items-center">
          <div className=" bg-breakfast bg-fixed bg-cover bg-center h-96 w-96 md:w-full pl-4 pt-4 flex justify-center text-6xl">
            FRESH BREAKFASTS
          </div>
          <div className=" bg-lunch bg-cover bg-fixed bg-center h-96 w-96 md:w-full pl-4 pt-4 flex justify-center text-6xl">
            FRESH LUNCH
          </div>
          <div className=" bg-dinner bg-cover bg-fixed bg-center h-96 w-96 md:w-full pl-4 pt-4 flex justify-center text-6xl">
            FRESH DINNER
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <p className="text-center">Copyright &copy; 2023 groupC</p>
        </div>
      </footer>
    </>
  );
}
