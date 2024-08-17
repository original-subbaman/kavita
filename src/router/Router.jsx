import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import LanguageWall from "../pages/LanguageWall.jsx";
import Profile from "../pages/Profile.jsx";
function CreateRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/post/:id",
      element: <PostDetail />,
    },
    {
      path: "/languagewall",
      element: <LanguageWall />,
    },
    { path: "/profile", element: <Profile /> },
  ]);
}

export default CreateRouter;
