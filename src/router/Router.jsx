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
import Notification from "../pages/Notification.jsx";
import RootWrapper from "../components/RootWrapper.jsx";
function CreateRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootWrapper />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/post/:id",
          element: <PostDetail />,
        },
        {
          path: "/inspiration",
          element: <LanguageWall />,
        },
        {
          path: "/my-posts",
          element: <MyPosts />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/notifications",
          element: <Notification />,
        },
      ],
    },

    { path: "/login-redirect", element: <LoginRedirect /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <PageNotFound /> },
  ]);
}

export default CreateRouter;
