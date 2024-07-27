import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./App.css";

function App() {
  const [zoomIn, setZoomIn] = useState(false);

  const handleZoom = () => {
    setZoomIn(!zoomIn);
  };

  return (
    <div>
      <button onClick={handleZoom} style={{ position: "absolute", zIndex: 1 }}>
        {zoomIn ? "Zoom Out" : "Zoom In"}
      </button>
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        camera={{ position: [0, 2, 5], fov: 75 }}
      >
        <Scene zoomIn={zoomIn} />
      </Canvas>
    </div>
  );
}

export default App;
