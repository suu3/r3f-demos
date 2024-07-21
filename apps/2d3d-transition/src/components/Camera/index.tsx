import { useRef } from "react";
import ControlledCameras from "../ControlledCameras";

export default function Camera({
  mode,
}: {
  mode: "orthographic" | "perspective";
}) {
  const controls = useRef(null!);

  return (
    <ControlledCameras
      mode={mode}
      ref={controls}
      maxPolarAngle={Math.PI / 2}
      restThreshold={0.01}
      dampingFactor={0.05}
      perspectivePosition={[0, 2, 10]}
      perspectiveTarget={[0, 0, 0]}
      orthographicPosition={[0, 2, 0]}
      orthographicTarget={[0, 0, 0]}
      // Set the *initial* camera params for both modes
      // Currently, changing these is not well supported (weird stuff will happen)
      perspectiveCameraProps={{
        fov: 90,
        near: 1,
        far: 100,
      }}
      orthographicCameraProps={{
        zoom: 30, // Warning: changing the ortho zoom prop after initialization is not yet supported
        near: -100,
        far: 100,
      }}
    />
  );
}
