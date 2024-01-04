import React, { useState } from "react";
import styles from "./ResultsComponent.module.scss";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store";
import { Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface AnalysisItemProps {
  label: string;
  value: number | string;
  isNegative?: boolean;
  singleColumn?: boolean;
  comments: string[];
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({
  label,
  value,
  comments,
  isNegative = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={`${styles.analysisItem}`}>
        <span className={styles.label}>{label}:</span>
        <span className={isNegative ? styles.negative : styles.positive}>
          {value}
        </span>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="small"
          className={styles.expandButton}
        >
          {expanded ? (
            <KeyboardArrowUpIcon
              className={expanded ? styles.expandOpen : ""}
            />
          ) : (
            <KeyboardArrowDownIcon
              className={expanded ? styles.expandOpen : ""}
            />
          )}
        </IconButton>
      </div>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        style={{ width: "90%" }}
      >
        <div className={styles.commentsContainer}>
          {comments.map((comment: string, index: number) => (
            <div key={index} className={styles.comment}>
              {comment}
            </div>
          ))}
        </div>
      </Collapse>
    </>
  );
};

export const ResultsComponent = () => {
  const $analysis = useSelector((state: AppState) => state.user.video);
  const { videoTitle, total_comments, details, label_comments } = $analysis;

  const isNegativeCount = details["IsNegative"]?.negative || 0;

  const isNegastiveRatio = (isNegativeCount / total_comments).toFixed(3);
  const isPositiveRatio = (
    (total_comments - isNegativeCount) /
    total_comments
  ).toFixed(3);

  const renderAnalysisItems = () => {
    return Object.entries(details).map(([label, analysis]) => {
      let negativeLabel;

      negativeLabel = `Is ${label.replace("Is", "")}`;

      const { negative } = analysis;
      const comments = label_comments[label] || [];

      return (
        <React.Fragment key={label}>
          <AnalysisItem
            label={negativeLabel}
            value={negative}
            isNegative
            comments={comments}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Showing Analysis For:</h3>
        <h3 style={{ fontStyle: "italic" }}>{videoTitle}</h3>
      </div>
      <div className={styles.stat}>
        Total Comments Analyzed: <strong>{total_comments}</strong>
      </div>
      <div className={styles.stat}>
        Positive to Negative Ratio:{" "}
        <strong className={styles.positive}>{isPositiveRatio}</strong> :{" "}
        <strong className={styles.negative}>{isNegastiveRatio}</strong>
      </div>
      <div className={styles.analysisContainer}>
        <strong style={{ color: "black" }}>Comment Details</strong>
        {renderAnalysisItems()}
      </div>
    </div>
  );
};

export default ResultsComponent;
