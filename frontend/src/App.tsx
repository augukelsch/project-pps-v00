import { RouterProvider } from "react-router-dom";
import { router, routerNotLoggedIn } from "./routes";

function App() {
  if(!localStorage.getItem('access_token') || localStorage.getItem('access_token')! == 'undefined'){
    if(window.location.pathname !=  '/login'){
      window.location.pathname = '/login'
    }
    return <RouterProvider router={routerNotLoggedIn} />;
  }
  return <RouterProvider router={router} />;
}

export default App;