import { Fragment } from "react";
import SearchBar from "./searchBar";

/**
 * Layout component that provides a common structure for pages.
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The content to be displayed within the layout.
 */
export default function Layout(props) {
  return (
    <Fragment>
      <div>
        {/* Render the SearchBar component at the top of the layout */}
        <SearchBar />
        <div className="search-bar-container items-center mb-4"></div>
        {/* Render the content passed as children */}
        {props.children}
      </div>
    </Fragment>
  );
}
