import Link from 'next/link'

export default function NavLink(props) {
  return (
    <Link href = {props.href} className='  hover:bg-slate-600 p-2 rounded-lg flex items-center'>
        {props.children}
    </Link>
  )
}
