import { usePage } from "@/hooks/usePage";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import lists from "@/const/diabetes";
import { useAvatar } from "@/hooks/useAvatar";

export default function Diabetes() {
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
        className="bg-white flex-1 rounded-lg text-sm p-4 pb-0 overflow-y-auto"
      >
        {lists[activeIndex].content}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {lists[activeIndex].type === "confirm" ? (
          lists[activeIndex]?.options?.map((item, index) => (
            <Button
              key={index}
              className="whitespace-pre-wrap h-auto"
              onClick={() => {
                if (item.responseType === "explanation") {
                } else if (item.responseType === "next") {
                  setActiveIndex(item.nextIndex);
                }
              }}
            >
              {item.label}
            </Button>
          ))
        ) : (
          <div className="absolute bottom-4 right-4 z-20">
            <Button
              onClick={() => {
                if (activeIndex === lists.length - 1) {
                  setPage("home");
                } else {
                  setActiveIndex(
                    lists[activeIndex].nextIndex || activeIndex + 1
                  );
                }
              }}
            >
              {activeIndex === lists.length - 1 ? "OKE" : "Selanjutnya"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
