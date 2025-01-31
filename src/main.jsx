import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import BlockProgramming from "./pages/BlockProgramming";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blockprogramming" element={<BlockProgramming/>} />
      </Routes>
    </BrowserRouter>
);
