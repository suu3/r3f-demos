import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";

const DollyZoom = ({ width = 5 }) => {
  const { camera } = useThree();
  const [distance, setDistance] = useState(camera.position.z);
  const [fieldOfView, setFieldOfView] = useState(camera.fov);

  useEffect(() => {
    // Set the initial FOV value for the camera
    const initialFov = Math.atan(width / (2 * distance)) * 2 * (180 / Math.PI);
    setFieldOfView(initialFov);
    camera.fov = initialFov;
    camera.updateProjectionMatrix();
  }, [camera, distance, width]);

  useFrame(() => {
    if (camera.fov !== fieldOfView) {
      // Update distance when FOV changes
      const newDistance =
        width / (2 * Math.tan((0.5 * fieldOfView * Math.PI) / 180));
      setDistance(newDistance);
      camera.position.z = newDistance;
    } else if (camera.position.z !== distance) {
      // Update FOV when distance changes
      const newFov =
        Math.atan(width / (2 * camera.position.z)) * 2 * (180 / Math.PI);
      setFieldOfView(newFov);
      camera.fov = newFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

export default DollyZoom;
