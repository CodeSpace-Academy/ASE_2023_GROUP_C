import Link from 'next/link';

export default function NavLink(props) {
  const { href, children } = props;
  return (
    <Link
      href={href}
      className="  hover:bg-slate-600 p-2 rounded-lg flex items-center"
    >
      {children}
    </Link>
  );
}
