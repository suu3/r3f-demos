import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";

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

const Scene = ({ cameraProps, isOrthographic }: any) => {
  const { scene } = useThree();
  scene.background = new THREE.Color("lightGray");

  return (
    <>
      {/* 애니메이션된 카메라 사용 */}
      {isOrthographic ? (
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 200]}
        />
      ) : (
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 200]}
          fov={75}
          near={0.1}
          far={1000}
        />
      )}
      <OrbitControls />
      <Grid />

      <ambientLight intensity={0.25} />
      <pointLight intensity={0.75} position={[500, 500, 1000]} />

      <Box position={[70, 70, 0]} />
      <Box position={[-70, 70, 0]} />
      <Box position={[70, -70, 0]} />
      <Box position={[-70, -70, 0]} />
    </>
  );
};

const Box = (props) => {
  const boxRef = useRef();

  return (
    <mesh ref={boxRef} {...props}>
      <boxGeometry args={[100, 100, 100]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
};

function App() {
  const [isOrthographic, setIsOrthographic] = useState(true);

  const cameraProps = useSpring({
    position: isOrthographic ? [0, 0, 500] : [300, 300, 300],
    zoom: isOrthographic ? 1 : 1,
    config: { tension: 170, friction: 26 },
  });

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
        <Scene cameraProps={cameraProps} isOrthographic={isOrthographic} />
      </Canvas>
    </div>
  );
}

export default App;
