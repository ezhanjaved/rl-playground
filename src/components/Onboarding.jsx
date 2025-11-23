import React from "react";
import "../styling/style.css";

export function Onboarding() {
  return (
    <div className="onboarding-container">
      <div className="onboarding-border"></div>
            <div className="progress-wrapper">
              <div className="progress-bar-bg"></div>
              <div className="progress-bar-fill"></div>
              <div className="back-arrow">←</div>
            </div>

      <div className="onboarding-content">
        <div className="onboarding-left">
          <div>
            <h1 className="title-line">Tell Us</h1>
            <h1 className="title-line">a Bit</h1>
            <h1 className="title-line">About</h1>
            <h1 className="title-line">Yourself</h1>
          </div>
        </div>

        <div className="onboarding-right">
          <div className="onboarding-form">


            <label className="label">Full Name</label>
            <input className="input" />

            <label className="label">Email</label>
            <input className="input" />

            <fieldset className="checkbox-group">
              <legend className="label">What defines you best</legend>
              <label className="checkbox-line">
                <input type="checkbox" /> Teacher
              </label>
              <label className="checkbox-line">
                <input type="checkbox" /> Student
              </label>
              <label className="checkbox-line">
                <input type="checkbox" /> AI engineer
              </label>
            </fieldset>

            <button className="btn-next">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
