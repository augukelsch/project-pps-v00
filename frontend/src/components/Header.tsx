export default function Header(props:any) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow p-5">
      <h1 className="text-2xl font-light ">{props.children}</h1>
    </div>
  );
}