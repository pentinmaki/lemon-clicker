import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../components/Root";
import ErrorPage from '../pages/ErrorPage';
import Clicker from '../pages/Clicker';
import Store from '../pages/Store';
import Settings from '../pages/Settings';
import GameContext from '../context/GameContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Clicker /> },
      { path: "store", element: <Store /> },
      { path: "settings", element: <Settings /> },
    ]
  }
]);

function AppRouter(props) {
  return (
    <GameContext.Provider value={props}>
      <RouterProvider router={router} />
    </GameContext.Provider>
  );
}

export default AppRouter;
