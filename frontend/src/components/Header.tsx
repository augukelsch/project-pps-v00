export default function Header(props:any) {
  return (
    <div className="bg-white shadow p-5">
      <h1 className="text-2xl font-semibold text-gray-800">{props.children}</h1>
    </div>
  );
}