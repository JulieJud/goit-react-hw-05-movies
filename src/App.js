import { Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./views/HomePage";
import MovieDetailsPage from "./views/MovieDetailsPage";
import NotFoundViews from "./views/NotFoundView";
import "./App.css";

export default function App() {
  return (
    <div>
      <AppBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies/:slug" component={MovieDetailsPage} />
        <Route component={NotFoundViews} />
      </Switch>
    </div>
  );
}
