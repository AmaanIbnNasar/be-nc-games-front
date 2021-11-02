import React, { useState } from "react";
import { useParams } from "react-router";
import { useApi, useApiCallback } from "./api";

const UpdateVotes = ({ review_id, voteDiff, setReview }) => {
  const [state, error, cb] = useApiCallback(
    `/api/reviews/${review_id}`,
    {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inc_votes: voteDiff }),
    },
    setReview
  );

  return (
    <button className="btn btn-dark ms-2" onClick={cb}>
      {voteDiff > 0 ? "Upvote" : "Downvote"}
    </button>
  );
};

const CommentForm = ({ review_id, setComments }) => {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [state, error, cb] = useApiCallback(
    `/api/reviews/${review_id}/comments`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, body }),
    },
    setComments
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        cb();
      }}
    >
      <h3 className="mb-3">New comment</h3>
      <div className="mb-3">
        <label for="exampleFormControlInput1" classname="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Comment
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div className="d-grid">
        <input type="submit" value="Submit" className="btn btn-primary mb-3" />
      </div>
    </form>
  );
};

const CommentDetail = ({ comment: { author, votes, body, created_at } }) => {
  return (
    <>
      <div>{body}</div>
      <div className="row text-muted">
        <div className="col">{author}</div>
        <div className="col">Votes: {votes}</div>
        <div className="col">{new Date(created_at).toLocaleString()}</div>
      </div>
      <hr />
    </>
  );
};

const ReviewComments = ({ review_id }) => {
  const [comments, error, setComments] = useApi(
    `/api/reviews/${review_id}/comments`
  );
  if (comments) {
    return (
      <>
        <h3>Comments</h3>
        {comments.comments.length === 0 && <h4>No comments</h4>}
        {comments.comments.map((comment) => (
          <CommentDetail comment={comment} key={comment.comment_id} />
        ))}
        <CommentForm
          setComments={(newComment) =>
            setComments({
              comments: [...comments.comments, newComment.comment],
            })
          }
          review_id={review_id}
        />
      </>
    );
  } else if (error) {
    return <h3>ERROR: {error}</h3>;
  } else {
    return <h3>LOADING</h3>;
  }
};

const ReviewDetail = () => {
  const { review_id } = useParams();
  const [review, error, setReview] = useApi(`/api/reviews/${review_id}`);
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
          <div className="d-flex justify-content-between mb-4 text-muted">
            <div>Owner: {owner}</div>
            <div>Desginer: {designer}</div>
            <div>Category: {category}</div>
            <div>Votes: {votes}</div>
            <div>
              <UpdateVotes
                review_id={review_id}
                voteDiff={1}
                setReview={setReview}
              />
              <UpdateVotes
                review_id={review_id}
                voteDiff={-1}
                setReview={setReview}
              />
            </div>
          </div>
          <div>{review_body}</div> <br />
          <ReviewComments review_id={review_id} />
        </div>
      </>
    );
  } else if (error) {
    return <h1>ERROR: {error}</h1>;
  } else {
    return <h1>LOADING</h1>;
  }
};

export default ReviewDetail;
