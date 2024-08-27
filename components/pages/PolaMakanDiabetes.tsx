import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { usePage } from "@/hooks/usePage";
import lists from "@/const/pola-makan-diabetes";
import { useAvatar } from "@/hooks/useAvatar";

export default function PolaMakanDiabetes() {
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
        {lists[activeIndex].options && lists[activeIndex].options.length > 0 ? (
          lists[activeIndex].options.map((option, index) => (
            <Button
              key={index}
              className="whitespace-pre-wrap h-auto"
              onClick={() => {
                if (option.responseType === "next") {
                  setActiveIndex(option.nextIndex);
                } else if (option.responseType === "redirect") {
                  setPage(option.page);
                }
              }}
            >
              {option.label}
            </Button>
          ))
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
}
