import { usePage } from "@/hooks/usePage";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useAvatar } from "@/hooks/useAvatar";

export default function RenderExplanation({ lists }: { lists: JSX.Element[] }) {
  const { setPage, page } = usePage((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const chatWrapper = useRef<HTMLDivElement | null>(null);
  const setPath = useAvatar((state) => state.setPath);

  useEffect(() => {
    if (chatWrapper.current) {
      chatWrapper.current.scrollTo(0, 0);
    }

    setPath(`${page}/${activeIndex}`);
    return () => setPath(undefined);
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 pb-0">
      <div
        ref={chatWrapper}
        className="bg-white flex-1 rounded text-sm p-4 overflow-y-auto"
      >
        {lists[activeIndex]}
      </div>
      <div className="absolute bottom-4 right-4 z-20">
        <Button
          onClick={() => {
            if (activeIndex === lists.length - 1) {
              setPage("home");
            } else {
              setActiveIndex(activeIndex + 1);
            }
          }}
        >
          {activeIndex === lists.length - 1 ? "Selesai" : "Selanjutnya"}
        </Button>
      </div>
    </div>
  );
}
