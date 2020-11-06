import "./App.css";
import Background from "./templates/Background";
import { POSTS, LANDING, SIGN_IN, PASSWORD_FORGET } from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Loader from "./components/Loader";

function App() {
  const { toggleLoader } = useSelector((state) => state.settings);
  return (
    <Background>
      <Router>
        <Switch>
          <PrivateRoute component={Home} path={LANDING} exact />
          <PrivateRoute component={Posts} path={POSTS} exact />

          <Route component={SignIn} path={SIGN_IN} exact />
          <Route component={ForgotPassword} path={PASSWORD_FORGET} exact />
        </Switch>
      </Router>

      <Loader toggle={toggleLoader} />
    </Background>
  );
}

export default App;
