import { Fragment } from 'react'
import SearchBar from './searchBar'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'


export default function Layout(props) {
  return (
    <Fragment>
      <div >

      <SearchBar />
      <div className="search-bar-container items-center mb-4">
      </div>
      {props.children}
      </div>
    </Fragment>
  )
}
