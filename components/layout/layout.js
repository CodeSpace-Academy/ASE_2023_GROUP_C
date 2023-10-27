import { Fragment } from 'react'
import SearchBar from './searchBar'


export default function Layout(props) {
  return (
    <Fragment>
      <div className=' bg-slate-900 '>
      <SearchBar />
      {props.children}
      </div>
    </Fragment>
  )
}
