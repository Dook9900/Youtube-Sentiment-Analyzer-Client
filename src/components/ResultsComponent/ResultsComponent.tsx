import React from "react";
import styles from "./ResultsComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/app/store";

interface AnalysisItemProps {
  label: string;
  value: number | string;
  isNegative?: boolean;
  singleColumn?: boolean;
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({
  label,
  value,
  isNegative = false,
  singleColumn,
}) => {
  return (
    <div
      className={`${styles.analysisItem} ${
        singleColumn && styles.totalCommentItem
      }`}
    >
      <span className={styles.label}>{label}:</span>
      <span className={isNegative ? styles.negative : styles.positive}>
        {value}
      </span>
    </div>
  );
};

export const ResultsComponent = () => {
  const $analysis = useSelector((state: AppState) => state.user.video);

  const {
    videoTitle,
    total_comments,
    positiveCount,
    positiveRatio,
    negativeCount,
    negativeRatio,
  } = $analysis;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Showing Analysis For:</h3>
        <h3 style={{ fontStyle: "italic" }}>{videoTitle}</h3>
      </div>
      <AnalysisItem
        label="Total Comments Analyzed"
        value={total_comments}
        singleColumn
      />
      <div className={styles.analysisContainer}>
        <AnalysisItem label="Positive Count" value={positiveCount} />
        <AnalysisItem
          label="Positive Ratio"
          value={(positiveRatio * 100).toFixed(2) + "%"}
        />
        <AnalysisItem
          label="Toxic Count"
          value={negativeCount}
          isNegative={true}
        />
        <AnalysisItem
          label="Toxic Ratio"
          value={(negativeRatio * 100).toFixed(2) + "%"}
          isNegative={true}
        />
      </div>
    </div>
  );
};

export default ResultsComponent;
