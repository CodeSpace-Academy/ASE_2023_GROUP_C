import { Fragment } from 'react'
import MainNavigation from './main-navigation'

export default function Layout() {
  return (
    <Fragment>
      <MainNavigation  />
      {props.children}
    </Fragment>
  )
}
//