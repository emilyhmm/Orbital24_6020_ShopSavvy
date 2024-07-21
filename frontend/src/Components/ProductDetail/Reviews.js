import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import "./Reviews.css";

function Reviews({ productlink }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentiments, setSentiments] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/product/review`,
          { productlink: productlink }
        );
        setReviews(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productlink]);

  const fetchSentiment = async (text, index, retries = 3) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: text }),
        }
      );

      const result = await response.json();

      if (result.error && retries > 0) {
        console.log(
          `Model loading. Retrying in 5 seconds... (${retries} retries left)`
        );
        setTimeout(() => fetchSentiment(text, index, retries - 1), 5000);
      } else {
        setSentiments((prevSentiments) => ({
          ...prevSentiments,
          [index]: result,
        }));
      }
    } catch (error) {
      console.error("Error fetching sentiment:", error);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      reviews.forEach((review, index) => {
        fetchSentiment(review.text, index);
      });
    }
  }, [reviews]);
  return (
    <div className="reviews-container">
      {loading ? (
        <CircularProgress className="reviews-loading-spinner" />
      ) : reviews.length > 0 ? (
        reviews.map((r, index) => (
          <div key={index} className="review-item">
            <p className="review-text">"{r.text}"</p>
            <div className="review-metadata">
              <div className="review-info">
                <h3 className="review-name">{r.name}</h3>
                <h4 className="review-rating">{r.rating}</h4>
              </div>
              <p className="review-sentiment">
                Sentiment:{" "}
                {sentiments[index]
                  ? JSON.stringify(sentiments[index])
                  : "Loading..."}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-reviews-message">No reviews available</p>
      )}
    </div>
  );
}

export default Reviews;
