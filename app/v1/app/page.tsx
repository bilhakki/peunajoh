"use client";
import { Experience } from "@/components/character/experience";
import { Canvas } from "@react-three/fiber";
import { ContentBuilder } from "./content";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect } from "react";
import { useFingerprint } from "@/hooks/useFingerprint";

export default function Page() {
  const setVisitorId = useFingerprint((state) => state.setVisitorId);
  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
    };

    setFp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className="h-dvh w-full"
      style={{
        background: "linear-gradient(222deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      {/* content container */}
      <div
        style={{
          height: "55dvh",
          // background: "yellow",
          // position: "relative",
        }}
      >
        {ContentBuilder()}
      </div>
      {/* avatar container */}
      <div
        style={{
          height: "45dvh",
          // background: "red",
          position: "relative",
        }}
      >
        <Canvas
          style={{
            position: "absolute",
            left: "-18%",
            bottom: "0",
          }}
          camera={{ position: [-0.3, 0.2, 1] }}
        >
          <Experience />
        </Canvas>
      </div>
    </main>
  );
}
