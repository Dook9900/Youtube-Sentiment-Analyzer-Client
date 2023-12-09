import React, { useState } from "react";
import styles from "./InputCard.module.scss";
import { useDispatch } from "react-redux";
import { setURL as setYoutubeURL } from "@/app/store";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpIcon from "@mui/icons-material/Help";
import { Icon } from "@mui/material";

export const InputCard = () => {
  const dispatch = useDispatch();

  const [URL, setURL] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = () => {
    dispatch(setYoutubeURL(URL));
  };

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
          onChange={(e) => {
            setURL(e.target.value);
          }}
        />
        <button className={styles.analyzeButton} onSubmit={handleSubmit}>
          Analyze
        </button>
        <div className={styles.cardOverlay}></div>
      </div>
      <div className={styles.cardFooter}>
        <div
          className={styles.iconContainer}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering ? <HelpIcon /> : <HelpOutlineIcon />}
        </div>
        <div className={styles.cardOverlay}></div>
        <div className={styles.hoverText}>Your Text Here</div>
      </div>
    </div>
  );
};

export default InputCard;
