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
  USER,
} from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import Media from "./pages/Media";
import Pages from "./pages/Pages";
import Comments from "./pages/Comments";
import ForgotPassword from "./pages/ForgotPassword";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";

function App() {
  const { toggleLoader } = useSelector((state) => state.settings);
  return (
    <Background>
      <Router>
        <Switch>
          <PrivateRoute component={Home} path={LANDING} exact />
          <PrivateRoute component={Posts} path={POSTS} exact />
          <PrivateRoute component={Media} path={MEDIA} exact />
          <PrivateRoute component={Pages} path={PAGES} exact />
          <PrivateRoute component={Comments} path={COMMENTS} exact />
          <PrivateRoute component={Users} path={USERS} exact />
          <PrivateRoute component={EditUser} path={USER} exact />

          <Route component={SignIn} path={SIGN_IN} exact />
          <Route component={ForgotPassword} path={PASSWORD_FORGET} exact />
        </Switch>
      </Router>

      <Loader toggle={toggleLoader} />
    </Background>
  );
}

export default App;
