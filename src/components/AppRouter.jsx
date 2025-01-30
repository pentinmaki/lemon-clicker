import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../components/Root";
import ErrorPage from '../pages/ErrorPage';
import Clicker from '../pages/Clicker';
import Store from '../pages/Store';
import Settings from '../pages/Settings';

function AppRouter(props) {
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root items={props.stats.itemstobuy} />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Clicker stats={props.stats} handleClick={props.handleClick} /> },
        { path: "store", element: <Store stats={props.stats}
                                         storeitems={props.storeitems}
                                         handlePurchase={props.handlePurchase} />},
        { path: "settings", element: <Settings stats={props.stats}
                                               handleReset={props.handleReset} />},
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;     