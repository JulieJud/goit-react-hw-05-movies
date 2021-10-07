import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
//import HomePage from "./views/HomePage";
//import MovieDetailsPage from "./views/MovieDetailsPage";
//import NotFoundViews from "./views/NotFoundView";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage.js" /* webpackChunkName: "home-page"  */)
);
const MoviePage = lazy(() =>
  import("./views/MoviePage/MoviePage" /* webpackChunkName: "search-bar"  */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage.js" /* webpackChunkName: "movie-details"  */
  )
);
const NotFoundViews = lazy(() =>
  import(
    "./views/NotFound/NotFoundView.js" /* webpackChunkName: "NotFoundViews"  */
  )
);

export default function App() {
  return (
    <div>
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <AppBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviePage} />
          <Route component={NotFoundViews} />
        </Switch>
      </Suspense>
    </div>
  );
}
