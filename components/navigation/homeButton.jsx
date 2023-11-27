import React from 'react';
import Link from 'next/link';

function HomeButton() {
  return (
    <header className="text-white">
      <Link href="/" className="text-2xl font-extrabold">
        The Recipe app 🍜
      </Link>
    </header>
  );
}

export default HomeButton;
