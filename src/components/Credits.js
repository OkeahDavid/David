import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";

const Credits = () => (
  <FadeInSection>
    <div id="credits">
      <div className="ending-credits">
        <div className="motto">Keep moving forward!</div>
        <div>Created by David Okeah.</div>
        <div>All rights reserved. &copy;</div>
      </div>
    </div>
  </FadeInSection>
);

export default Credits;
