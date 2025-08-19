import { RouterProvider } from "react-router-dom";
import { router, routerNotLogedIn } from "./routes";

function App() {
  if(!localStorage.getItem('access_token') || localStorage.getItem('access_token')! == 'undefined'){
    if(window.location.pathname !=  '/login'){
      window.location.pathname = '/login'
    }
    return <RouterProvider router={routerNotLogedIn} />;
  }
  return <RouterProvider router={router} />;
}

export default App;