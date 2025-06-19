import React from "react";
import "./Subscribe.css";
import { auth } from "../firebase/firebase-config.js";

const createCheckout = async () => {
    const res = await fetch("/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ uid: auth.currentUser.uid }),
    });
    const { url } = await res.json();
    window.location.href = url;
}

export default function Subscribe() {
  return (
    <div className="subscribe-container">
      <h1 className="subscribe-title">Choose Your Plan</h1>
      <p className="subscribe-intro">Get the most out of Bonus Life with a plan that suits you.</p>

      <div className="plans-wrapper">
        {/* Free Plan */}
        <div className="plan-card free-plan">
          <h2>Free</h2>
          <p>✔ Access to basic workouts</p>
          <p>✔ Progress tracking</p>
          <p>✖ No expert support</p>
          <p>✖ Limited challenges</p>
          <h3>0 xaf/ month</h3>
          <button className="select-btn">Current Plan</button>
        </div>

        {/* Premium Plan */}
        <div className="plan-card premium-plan">
          <h2>Premium</h2>
          <p>✔ Full workout library</p>
          <p>✔ Expert coaching</p>
          <p>✔ Advanced analytics</p>
          <p>✔ Priority support</p>
          <h3>3000 xaf / month</h3>
          <button className="subscribe-btn">Subscribe Now</button>
        </div>
      </div>
    </div>
  );
}
