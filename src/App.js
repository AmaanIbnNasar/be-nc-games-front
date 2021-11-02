import ApiDisplay from "./ApiDisplay";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CategoriesDisplay from "./CategoriesDisplay";
import ReviewList from "./ReviewList";
import ReviewDetail from "./ReviewDetail";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/api">
          <ApiDisplay />
        </Route>
        <Route exact path="/api/categories">
          <CategoriesDisplay />
        </Route>
        <Route exact path="/api/reviews">
          <ReviewList />
        </Route>
        <Route exact path="/api/reviews/:review_id">
          <ReviewDetail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
