import React, { useState } from "react";
import { useApi } from "./api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./ReviewList.css";
const ReviewItem = ({
  reviewData: {
    review_img_url,
    title,
    owner,
    votes,
    review_id,
    comment_count,
    created_at,
    category,
  },
}) => {
  const history = useHistory();
  return (
    <div
      className="card w-100 reviewItem mb-3"
      onClick={() => history.push(`/api/reviews/${review_id}`)}
    >
      <div className="row g-0" style={{ height: "150px" }}>
        <div className="col-2" style={{ height: "100%" }}>
          <img
            className="img-review-list rounded-start"
            src={review_img_url}
          ></img>
        </div>
        <div className="col-10">
          <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <div className="row text-muted">
              <div className="col">Owner: {owner}</div>
              <div className="col">Category: {category}</div>
              <div className="col">Votes: {votes}</div>
              <div className="col">Comment count: {comment_count}</div>
              <div className="col">
                Created At: {new Date(created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterReviews = ({
  sortBy,
  setSortBy,
  order,
  setOrder,
  category,
  setCategory,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Filters:</h5>
        <div className="mb-3">
          Sort By:
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created_at">Date</option>
            <option value="owner">Owner</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comment Count</option>
          </select>
        </div>
        <div className="mb-3">
          Order:
          <select
            className="form-select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <div className="mb-3">
          Category:
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">None</option>
            <option value="strategy">Stategy</option>
            <option value="hidden-roles">Hidden Roles</option>
            <option value="dexterity">Dexterity</option>
            <option value="push-your-luck">Push your Luck</option>
            <option value="roll-and-write">Roll and Write</option>
            <option value="deck-building">Deck Building</option>
            <option value="engine-building">Engine Building</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const ReviewList = () => {
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("ASC");
  const [category, setCategory] = useState("");
  const [reviewData, error] = useApi(
    `/api/reviews?sort_by=${sortBy}&order=${order}&category=${category}`
  );
  return (
    <div className="container-fluid">
      <h1>Review Data</h1>
      <div className="row">
        <div className="col-3">
          <div className="w-100 bg-danger">
            <FilterReviews
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
              category={category}
              setCategory={setCategory}
            />
          </div>
        </div>
        <div className="col-9">
          {reviewData
            ? reviewData.reviews.map((reviewItem) => (
                <ReviewItem
                  key={reviewItem.review_id}
                  reviewData={reviewItem}
                />
              ))
            : error
            ? error
            : "LOADING"}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
