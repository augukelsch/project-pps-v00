import { LogOut } from "lucide-react";

export default function Header(props:any) {
  function sendToLogin(){
    return alert("LOGOUT!")
  }
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow p-5 flex items-center justify-between">
      <h1 className="text-2xl font-light ">{props.children}</h1>
      <button className="dark:text-white text-black px-3 py-2 rounded-md dark:hover:text-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 flex flex gap-3" onClick={sendToLogin}>
         <LogOut />Sair
      </button>
    </div>
  );
}