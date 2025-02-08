import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import BlockProgramming from "./pages/BlockProgramming";
import { Toaster } from "react-hot-toast";
import VisualProgramming from "./pages/Visual/index.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blockprogramming" element={<BlockProgramming/>} />
        <Route path="/visualprogramming" element={<VisualProgramming/>} />
      </Routes>
    </BrowserRouter>
);
