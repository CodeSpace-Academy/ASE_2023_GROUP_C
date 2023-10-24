import { Fragment } from 'react'


export default function Layout(props) {
  return (
    <Fragment>
      <div className=' bg-slate-900 '>
      {props.children}
      </div>
    </Fragment>
  )
}
