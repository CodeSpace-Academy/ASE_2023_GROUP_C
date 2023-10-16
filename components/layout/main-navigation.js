import Link from "next/link";

const MainNavigation = ({ onSearch }) => {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <ul className="flex space-x-4">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-3xl font-semibold cursor-pointer">Recipe App</h1>
        </Link>
      </div>

        <li className="pl-4">
          <Link href="/recipe-list">
            <h1 className="text-3xl font-semibold cursor-pointer">
              Recipe List
            </h1>
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default MainNavigation;
