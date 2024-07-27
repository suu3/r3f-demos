import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Grid, CameraControls } from "@react-three/drei";
import Box from "../Box";
import * as THREE from "three";

function Scene({ zoomIn }) {
  const controlsRef = useRef(null);
  const { camera } = useThree();
  const width = 10; // Scene width, adjust as needed
  const minDistance = 2; // Minimum distance for zoom
  const maxDistance = 10; // Maximum distance for zoom
  const zoomSpeed = 0.1; // Speed of zoom animation

  useFrame(() => {
    if (controlsRef.current) {
      const distance = controlsRef.current.distance;
      const fov = (2 * Math.atan(width / (2 * distance)) * 180) / Math.PI;
      camera.fov = fov;
      camera.updateProjectionMatrix();

      // Animate zoom in and zoom out
      if (zoomIn) {
        if (controlsRef.current.distance > minDistance) {
          controlsRef.current.distance -= zoomSpeed;
        }
      } else {
        if (controlsRef.current.distance < maxDistance) {
          controlsRef.current.distance += zoomSpeed;
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid args={[10, 10]} />
      <Box />
      <CameraControls ref={controlsRef} />
    </>
  );
}

export default Scene;
