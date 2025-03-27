import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import LanguageWall from "../pages/LanguageWall.jsx";
import Profile from "../pages/Profile.jsx";
import MyPosts from "../pages/MyPosts.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import LoginRedirect from "../pages/LoginRedirect.jsx";
function CreateRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/post/:id",
      element: (
        <ProtectedRoute>
          <PostDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inspiration",
      element: (
        <ProtectedRoute>
          <LanguageWall />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my-posts",
      element: (
        <ProtectedRoute>
          <MyPosts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    { path: "/login-redirect", element: <LoginRedirect /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <PageNotFound /> },
  ]);
}

export default CreateRouter;
