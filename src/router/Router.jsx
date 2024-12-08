import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import LanguageWall from "../pages/LanguageWall.jsx";
import Profile from "../pages/Profile.jsx";
import MyPosts from "../pages/MyPosts.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
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
    { path: "/my-posts", element: <MyPosts /> },
    { path: "/profile", element: <Profile /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);
}

export default CreateRouter;
