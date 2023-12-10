import React from "react";
import styles from "./ResultsComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/app/store";

export const ResultsComponent = () => {
  const dispatch = useDispatch();

  const $videotitle = useSelector((state: AppState) => state.user.videoTitle);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Showing Analysis For:</h3>
        <h3>{$videotitle}</h3>
      </div>
    </div>
  );
};

export default ResultsComponent;
