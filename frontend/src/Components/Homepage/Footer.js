import React from "react";
import "./Homepage.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Savvy newsletter to receive our best shopping deals
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>About Us</h2>
            <Link to="https://docs.google.com/document/d/18xEF_c8LYVzgqPXAVK0Dzi_PsEjce5pyHRiAs3ptw58/edit">
              How it works
            </Link>
          </div>
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="https://github.com/emilyhmm/Orbital24_6020_ShopSavvy">
              Contact
            </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>Social Media</h2>
            <Link to="https://github.com/emilyhmm/Orbital24_6020_ShopSavvy">
              Github
            </Link>
          </div>
        </div>
      </div>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              ShopSavvy
              <i class="fab fa-typo3" />
            </Link>
          </div>
          <small class="website-rights">ShopSavvy © 2024</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
