import ApiDisplay from "./ApiDisplay";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TestPage from "./TestPage";
import CategoriesDisplay from "./CategoriesDisplay";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div class="container">
          <Link to="/api">Endpoints</Link>
          <Link to="/api/categories">Categories</Link>
        </div>
        <div className="container pt-4">
          <Switch>
            <Route exact path="/api">
              <ApiDisplay />
            </Route>
            <Route exact path="/api/categories">
              <CategoriesDisplay />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
