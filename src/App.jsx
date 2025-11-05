import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ZoomEffectOnScroll from "./zoomEffectOnScroll/ZoomEffectOnScroll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zoom-scroll" element={<ZoomEffectOnScroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
