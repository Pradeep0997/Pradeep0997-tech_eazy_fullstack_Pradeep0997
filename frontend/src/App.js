import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parcels from "./pages/Parcels";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Parcels />} />
      </Routes>
    </BrowserRouter>
  );
}
