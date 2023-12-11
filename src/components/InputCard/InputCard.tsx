import React, { ChangeEvent, useState } from "react";
import styles from "./InputCard.module.scss";
import { useSelector } from "react-redux";
import {
  AppState,
  fetchAnalysisResults,
  setURL,
  useDispatch,
} from "@/app/store";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpIcon from "@mui/icons-material/Help";

const HoverText = `This is Aaron, Duc, and Henry's CSC3730: Machine Learning Project. 
Enter a URL to a YouTube video link to analyze it's viewer sentiment, based on up to 1000 top comments.`;

export const InputCard = () => {
  const dispatch = useDispatch();

  const $loading = useSelector((state: AppState) => state.user.loading);

  const [URL, setURL] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  const isValidYoutubeURL = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (!url) {
      setError("");
      setURL("");
    } else if (isValidYoutubeURL(url)) {
      setError("");
      setURL(url);
    } else {
      setError("Enter a YouTube video link");
      setURL("");
    }
  };

  const handleSubmit = () => {
    if (URL) {
      dispatch(fetchAnalysisResults(URL));
    }
  };

  const disabled = URL === "" || $loading;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src="youtube-logo.png"
          alt="YouTube Logo"
          className={styles.youtubeLogo}
          onClick={() => window.open("https://www.youtube.com", "_blank")}
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
          onChange={handleURLChange}
        />
        <button
          className={styles.analyzeButton}
          onClick={handleSubmit}
          disabled={disabled}
        >
          {$loading ? (
            <div className={styles.analyzingContainer}>
              <div className={styles.spinner}></div>Analyzing...
            </div>
          ) : (
            "Analyze"
          )}
        </button>

        <div className={styles.errorPlaceholder}>
          {error && <div className={styles.errorText}>{error}</div>}
        </div>
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
        <div className={styles.hoverText}>{HoverText}</div>
      </div>
    </div>
  );
};

export default InputCard;
