import Link from "next/link";

const MainNavigation = ({ onSearch }) => {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-3xl font-semibold cursor-pointer">Recipe App</h1>
        </Link>
      </div>
      <ul className="flex space-x-4">
        <li className="pl-4"> {/* Added padding to the left side of "Recipe List" */}
          <Link href="/recipe-list">
            <h1 className=" pl-4 text-3xl font-semibold cursor-pointer">Recipe List</h1>
          </Link>
        </li>
        {/* Add more navigation items here */}
      </ul>
      <form>
        {/* Use the SearchBar component here */}
      </form>
    </nav>
  );
};

export default MainNavigation;
