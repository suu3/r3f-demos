/**
 * https://codesandbox.io/p/sandbox/r3f-controlledcameras-orthographic-perspective-transition-8uvue?file=%2Fsrc%2FCamera.tsx
 */

import { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

import * as THREE from "three";
import Camera from "./components/Camera";

const Grid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  return (
    <gridHelper
      ref={gridRef}
      args={[1000, 1000]}
      rotation={[0, Math.PI / 2, 0]}
      position={[0, 0, 200]}
    />
  );
};

const Scene = ({ isOrthographic }: any) => {
  const { scene } = useThree();
  scene.background = new THREE.Color("lightGray");

  return (
    <>
      <Camera mode={isOrthographic ? "orthographic" : "perspective"} />
      <Grid />

      <ambientLight intensity={0.25} />
      <pointLight intensity={0.75} position={[500, 500, 1000]} />

      <Box position={[7, 7, 0]} />
      <Box position={[-7, 7, 0]} />
      <Box position={[7, -7, 0]} />
      <Box position={[-7, -7, 0]} />
    </>
  );
};

const Box = (props) => {
  const boxRef = useRef();

  return (
    <mesh ref={boxRef} {...props}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
};

function App() {
  const [isOrthographic, setIsOrthographic] = useState(true);

  return (
    <div>
      <button
        style={{
          position: "relative",
          zIndex: 1,
        }}
        onClick={() => setIsOrthographic(!isOrthographic)}
      >
        {isOrthographic ? "2D" : "3D"}
      </button>
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Scene isOrthographic={isOrthographic} />
      </Canvas>
    </div>
  );
}

export default App;
