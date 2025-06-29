// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/issue/:id" element={<IssueDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);