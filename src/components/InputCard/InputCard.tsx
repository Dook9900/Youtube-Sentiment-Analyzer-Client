import React from "react";
import styles from "./InputCard.module.scss";

const InputCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src="youtube-logo.png"
          alt="YouTube Logo"
          className={styles.youtubeLogo}
        />
        <h1 className={styles.cardTitle}>YouTube Comments Analyzer</h1>
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardText}>
          Provide a Youtube URL to analyze its comments:
        </h2>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className={styles.urlInput}
        />
        <button className={styles.analyzeButton}>Analyze</button>
      </div>
      <div className={styles.cardFooter}>
        <h1 className={styles.cardTitle}>This is the Footer</h1>
      </div>
    </div>
  );
};

export default InputCard;
