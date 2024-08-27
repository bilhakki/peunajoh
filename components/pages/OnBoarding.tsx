"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { usePage } from "@/hooks/usePage";
import onBoarding from "@/const/on-boarding";
import { useAvatar } from "@/hooks/useAvatar";

const OnBoarding = () => {
  const { setPage, page } = usePage((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const chatWrapper = useRef<HTMLDivElement | null>(null);
  const setPath = useAvatar((state) => state.setPath);

  useEffect(() => {
    if (chatWrapper.current) {
      chatWrapper.current.scrollTo(0, 0);
    }
    if (activeIndex === onBoarding.length - 1) {
      localStorage.setItem("onboarding", "true");
    }
    setPath(`onboarding/${activeIndex}`);
    return () => setPath(undefined);
}, [activeIndex]);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 pb-0">
      <div
        ref={chatWrapper}
        className="bg-white flex-1 rounded-lg text-sm p-4 pb-0 overflow-y-auto"
      >
        {onBoarding[activeIndex]}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {activeIndex === onBoarding.length - 1 ? (
          <>
            <Button onClick={() => setPage("tentang-saya")}>MULAI SEKARANG</Button>
            <Button onClick={() => setPage("home")}>JANGAN MULAI</Button>
          </>
        ) : (
          <div className="absolute bottom-4 right-4 z-20">
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Selanjutnya
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
