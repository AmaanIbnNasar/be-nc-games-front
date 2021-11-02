import React from "react";
import { useParams } from "react-router";
import { useApi } from "./api";

const ReviewDetail = () => {
  const { review_id } = useParams();
  const [review, error] = useApi(`/api/reviews/${review_id}`);
  if (review) {
    const {
      review_img_url,
      title,
      review_body,
      owner,
      votes,
      designer,
      category,
    } = review.review;
    return (
      <>
        <div className="container-fluid p-0">
          <img className="reviewDetailImage" src={review_img_url}></img>
        </div>
        <div className="container pt-3">
          <h2>{title}</h2>
          <div class="d-flex justify-content-between mb-4 text-muted">
            <div>Owner: {owner}</div>
            <div>Desginer: {designer}</div>
            <div>Category: {category}</div>
            <div>Votes: {votes}</div>
          </div>
          <div>{review_body}</div>
        </div>
      </>
    );
  } else {
    return <h1>ERROR: {error}</h1>;
  }
};

export default ReviewDetail;
