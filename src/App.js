import './App.css';
import Body from "./Components/Body";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Components/Login";
import {UserProvider} from "./Utils/userContext";

function App() {
  const appRouter=createBrowserRouter([
      {
      path:'/',
      element:<Login/>
      },
      {
          path:'/home',
          element:<Body/>
      }
      ])
    return (
    <div className="">
        <UserProvider>
            <RouterProvider router={appRouter}/>
        </UserProvider>

    </div>
  );
}

export default App;
