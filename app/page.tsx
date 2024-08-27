"use client";
import { Experience } from "@/components/character/experience";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { ContentBuilder } from "./content";


export default function page() {
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
          height: "75dvh",
          // background: "yellow",
          // position: "relative",
        }}
      >
        {ContentBuilder()}
      </div>
      {/* avatar container */}
      <div
        style={{
          height: "25dvh",
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
