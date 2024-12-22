import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import LanguageWall from "../pages/LanguageWall.jsx";
import Profile from "../pages/Profile.jsx";
import MyPosts from "../pages/MyPosts.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
function CreateRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<Home />} />,
    },
    {
      path: "/post/:id",
      element: <ProtectedRoute element={<PostDetail />} />,
    },
    {
      path: "/languagewall",
      element: <ProtectedRoute element={<LanguageWall />} />,
    },
    { path: "/my-posts", element: <ProtectedRoute element={<MyPosts />} /> },
    { path: "/profile", element: <ProtectedRoute element={<Profile />} /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);
}

export default CreateRouter;
