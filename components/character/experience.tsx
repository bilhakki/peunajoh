"use client";
import { Avatar } from "@/components/character/avatar";
// import { useChat } from "@/hooks/useChat";
import {
  CameraControls,
  Environment,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import { LegacyRef, Suspense, useEffect, useRef, useState } from "react";

const Dots = (props: any) => {
  // const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  // useEffect(() => {
  //   if (loading) {
  //     const interval = setInterval(() => {
  //       setLoadingText((loadingText) => {
  //         if (loadingText.length > 2) {
  //           return ".";
  //         }
  //         return loadingText + ".";
  //       });
  //     }, 800);
  //     return () => clearInterval(interval);
  //   } else {
  //     setLoadingText("");
  //   }
  // }, [loading]);
  // if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  // const cameraControls = useRef<CameraControls>();
  // // const { cameraZoomed } = useChat();

  // useEffect(() => {
  //   if (cameraControls.current) {
  //     // cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
  //     // cameraControls.current.zoom(1.5);
  //     // cameraControls.current.enabled = !true;
  //   }
  // }, []);

  return (
    <>
      <Avatar />
      {/* <CameraControls
        ref={cameraControls as LegacyRef<CameraControls> | undefined}
        onChange={() => {
          // camera.updateProjectionMatrix();
          // cameraControls.current?.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
        }}
      /> */}

      {/* <PerspectiveCamera
        makeDefault
        position={[0, 1, 4]}
        // fov={70}
        // zoom={1}
      /> */}
      <Environment preset="apartment" />
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
    </>
  );
};
