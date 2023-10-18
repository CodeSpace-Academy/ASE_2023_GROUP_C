import { Fragment } from 'react'
import MainNavigation from './main-navigation'

export default function Layout(props) {
  return (
    <Fragment>
      <div className=' bg-slate-900 '>
      {/* <MainNavigation  /> */}
      {props.children}
      </div>
    </Fragment>
  )
}
//