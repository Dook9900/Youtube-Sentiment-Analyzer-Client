import InputCard from "@/components/InputCard/InputCard";
import styles from "./FrontPage.module.scss";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store";
import { useEffect, useState } from "react";
import ResultsComponent from "../ResultsComponent/ResultsComponent";

export default function FrontPage() {
  const $URL = useSelector((state: AppState) => state.user.URL);

  const [showResultsComponent, setShowResultsComponent] =
    useState<boolean>(true);

  useEffect(() => {
    $URL === ""
      ? setShowResultsComponent(false)
      : setShowResultsComponent(true);
  }, [$URL]);

  return (
    <div className={styles.home}>
      <InputCard />
      {showResultsComponent && <ResultsComponent />}
    </div>
  );
}
