import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import FeedPage from "../pages/FeedPage";
import CreatePost from "../pages/CreatePost";
import SinglePost from "../pages/SinglePost";
import Profile from "../pages/Profile";
import EditPost from "../pages/EditPost";
import * as PATHS from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },
    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.FEED_PAGE,
      element: user ? (
        <FeedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.CREATE_POST,
      element: user ? (
        <CreatePost {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.POST_PAGE,
      element: <SinglePost {...props} />,
    },
    {
      path: PATHS.CURRENT_USER_PROFILE,
      element: user ? (
        <Profile {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.EDIT_POST,
      element: <EditPost {...props} />,
    },
  ];
};
export default routes;
