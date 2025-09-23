import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootWrapper from "../components/RootWrapper.jsx";
import AuthorProfile from "../pages/AuthorProfile.jsx";
import Home from "../pages/Home.jsx";
import LanguageWall from "../pages/LanguageWall.jsx";
import Login from "../pages/Login.jsx";
import LoginRedirect from "../pages/LoginRedirect.jsx";
import MyPosts from "../pages/MyPosts.jsx";
import Notification from "../pages/Notification.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import Profile from "../pages/Profile.jsx";
import Signup from "../pages/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const ForgotPassword = lazy(() => import("../pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));

function CreateRouter() {
  return createBrowserRouter([
    {
      element: <RootWrapper />,
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "post/:id",
          element: <PostDetail />,
        },
        {
          path: "inspiration",
          element: (
            <ProtectedRoute>
              <LanguageWall />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-posts",
          element: (
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "author/:id",
          element: <AuthorProfile />,
        },
        {
          path: "notifications",
          element: (
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: "/login-redirect", element: <LoginRedirect /> },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/signup", element: <Signup /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "*", element: <PageNotFound /> },
  ]);
}

export default CreateRouter;
