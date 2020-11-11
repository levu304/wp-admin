import "./App.css";
import Background from "./templates/Background";
import {
  POSTS,
  LANDING,
  SIGN_IN,
  PASSWORD_FORGET,
  MEDIA,
  PAGES,
  COMMENTS,
  USERS,
  POST_NEW,
  CATEGORIES,
  TAGS,
  USER_NEW,
  PROFILE,
  USER_EDIT,
  USER_DELETE,
  MEDIA_NEW,
  PAGE_NEW,
} from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import Media from "./pages/Media";
import MediaNew from "./pages/MediaNew";
import Pages from "./pages/Pages";
import Comments from "./pages/Comments";
import ForgotPassword from "./pages/ForgotPassword";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import PostNew from "./pages/PostNew";
import Tags from "./pages/Tags";
import Categories from "./pages/Categories";
import UserNew from "./pages/UserNew";
import Profile from "./pages/Profile";
import UserDelete from "./pages/UserDelete";

function App() {
  const { toggleLoader } = useSelector((state) => state.settings);
  return (
    <Background>
      <Router>
        <Switch>
          <PrivateRoute component={Home} path={LANDING} exact />
          <PrivateRoute component={Posts} path={POSTS} exact />
          <PrivateRoute component={PostNew} path={POST_NEW} exact />
          <PrivateRoute component={Categories} path={CATEGORIES} exact />
          <PrivateRoute component={Tags} path={TAGS} exact />
          <PrivateRoute component={Media} path={MEDIA} exact />
          <PrivateRoute component={MediaNew} path={MEDIA_NEW} exact />
          <PrivateRoute component={Media} path={MEDIA} exact />
          <PrivateRoute component={Pages} path={PAGES} exact />
          <PrivateRoute component={PostNew} path={PAGE_NEW} exact />
          <PrivateRoute component={Comments} path={COMMENTS} exact />
          <PrivateRoute component={Users} path={USERS} exact />
          <PrivateRoute component={UserNew} path={USER_NEW} exact />
          <PrivateRoute component={UserEdit} path={USER_EDIT} />
          <PrivateRoute component={UserDelete} path={USER_DELETE} />
          <PrivateRoute component={Profile} path={PROFILE} exact />

          <Route component={SignIn} path={SIGN_IN} exact />
          <Route component={ForgotPassword} path={PASSWORD_FORGET} exact />
        </Switch>
      </Router>

      <Loader toggle={toggleLoader} />
    </Background>
  );
}

export default App;
