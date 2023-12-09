"use client";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import FrontPage from "@/components/FrontPage/FrontPage";

export default function Home() {
  return (
    <Provider store={store}>
      <FrontPage />
    </Provider>
  );
}
