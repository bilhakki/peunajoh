"use client";

import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components/character/experience";
import { ChatProvider } from "@/hooks/useChat";
import { ContentBuilder } from "@/app/content";
import { House } from "lucide-react";
import { usePage } from "@/hooks/usePage";
export default function Home() {
  const { setPage } = usePage((state) => state);
  return (
    <main
      className="h-dvh w-full"
      style={{
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      <div className="absolute left-4 top-4 z-20">
        <button
          className="border-2 size-10 rounded-full flex items-center justify-center p-2 hover:bg-white/10"
          onClick={() => setPage("home")}
        >
          <House className="size-8 text-white" />
        </button>
      </div>

      <ChatProvider>
        <div className="flex h-full">
          <div style={{ width: "50%" }} className="absolute inset-0">
            <div className="absolute size-full z-10"></div>
            <Canvas>
              {/* <OrbitControls
                makeDefault={true}
                enableZoom={false}
                enablePan={false}
              /> */}
              {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} /> */}
              <Experience />
            </Canvas>
          </div>
          <div className="ml-auto py-4 pr-4 relative z-20" style={{ width: "60%" }}>
            {ContentBuilder()}
          </div>
        </div>
      </ChatProvider>
    </main>
  );
}
