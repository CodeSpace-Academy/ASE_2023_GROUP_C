import { Fragment } from 'react'
import SearchBar from './searchBar'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'


export default function Layout(props) {
  return (
    <Fragment>
      <div >
      <Link href="/">
          <FontAwesomeIcon icon={faHome} size="lg" className="p-2" />
        </Link>
      <SearchBar />
      <div className="search-bar-container items-center mb-4">
        <Link href="/favouriteRecipes">
          <button className="text-white p-2">Favorite Recipes</button>
        </Link>
      </div>
      {props.children}
      </div>
    </Fragment>
  )
}
