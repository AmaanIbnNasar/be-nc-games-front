import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand">
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1">NC-Games</span>
      <div class="navbar-collapse collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/api">
              Endpoints
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/api/categories">
              Categories
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/api/reviews">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
