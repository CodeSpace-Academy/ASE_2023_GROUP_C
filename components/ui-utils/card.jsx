export default function Card(props) {
  const { children } = props;
  return <div className=" bg-slate-700 p-6 rounded-2xl">{children}</div>;
}
