import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import FaceIcon from "@mui/icons-material/Face";
import "./Reviews.css";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

function Reviews({ productlink }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentiments, setSentiments] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/product/review`,
          { productlink: productlink }
        );
        console.log('API Response:', response.data);
        setReviews(response.data.result);
        console.log('reviews', reviews)
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

  const fetchSentiment = async (text, index, retries = 7, delay = 5000) => {
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

      if (response.status === 429) {
        // Too many requests error handling
        if (retries > 0) {
          console.log(response);
          console.log(
            `Rate limit exceeded. Retrying in ${delay / 1000} seconds... (${retries} retries left)`
          );
          setTimeout(
            () => fetchSentiment(text, index, retries - 1, delay * 2),
            delay
          );
          return;
        } else {
          throw new Error("Max retries reached. Please try again later.");
        }
      }

      const result = await response.json();

      if (result.error && retries > 0) {
        console.log(
          `Model loading. Retrying in ${delay / 1000} seconds... (${retries} retries left)`
        );
        console.log(result.error);
        setTimeout(
          () => fetchSentiment(text, index, retries - 1, delay * 2),
          delay
        );
        return;
      }

      let sortedResult = result[0].sort((a, b) => {
        if (a.label === "POS") return -1; // "POS" comes before any other label
        if (b.label === "POS") return 1; // "POS" comes before any other label
        if (a.label === "NEU" && b.label === "NEG") return -1; // "NEU" before "NEG"
        if (a.label === "NEG" && b.label === "NEU") return 1; // "NEU" before "NEG"
        return 0; // Default order if labels are the same or not in the specified order
      });

      const POS = sortedResult.find((item) => item.label === "POS") || {
        score: 0,
      };
      const NEU = sortedResult.find((item) => item.label === "NEU") || {
        score: 0,
      };
      const NEG = sortedResult.find((item) => item.label === "NEG") || {
        score: 0,
      };
      const sum = POS.score + NEU.score + NEG.score;
      const normalizedScores = {
        POS: (POS.score / sum) * 100,
        NEU: (NEU.score / sum) * 100,
        NEG: (NEG.score / sum) * 100,
      };

      setSentiments((prevSentiments) => [...prevSentiments, normalizedScores]);
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
      ) : reviews.length && reviews.length > 0 ? (
        reviews.map((r, index) => (
          <div key={index} className="review-item">
            <div className="review-metadata">
              <div className="review-info">
                <p className="review-text">"{r.text}"</p>
                <h3 className="review-name">
                  <FaceIcon className="face-icon" />
                  {r.name}
                </h3>
                <h4 className="review-rating">{r.rating}</h4>
              </div>
              <div className="review-sentiment">
                {sentiments[index] ? (
                  <ReactFC
                    type="angulargauge"
                    width="30%"
                    height="250"
                    dataFormat="json"
                    dataSource={{
                      chart: {
                        caption: `Sentiment Score: ${sentiments[index].POS.toFixed(2)}%`,
                        lowerLimit: "0",
                        upperLimit: "100",
                        showValue: "1",
                        theme: "fusion",
                      },
                      colorRange: {
                        color: [
                          {
                            minValue: "0",
                            maxValue: "33",
                            code: "#F2726F",
                          },
                          {
                            minValue: "33",
                            maxValue: "67",
                            code: "#FFC533",
                          },
                          {
                            minValue: "67",
                            maxValue: "100",
                            code: "#62B58F",
                          },
                        ],
                      },
                      dials: {
                        dial: [
                          {
                            value: sentiments[index].POS,
                          },
                        ],
                      },
                    }}
                  />
                ) : (
                  "Loading..."
                )}
              </div>
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
