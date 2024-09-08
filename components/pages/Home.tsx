import { usePage } from "@/hooks/usePage";
import { Button } from "../ui/button";
import Image from "next/image";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { setPage } = usePage((state) => state);
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex w-full justify-between items-center">
        <Image
          className="h-12 w-auto"
          src="/logo.png"
          alt="logo"
          width={120}
          height={120}
        ></Image>
        <div className="flex items-center gap-2">
          <Image
            className="h-12 w-auto"
            src="/logo-kemendikbud.png"
            alt="logo"
            width={120}
            height={120}
          ></Image>
          <Button
            variant="default"
            size="icon"
            onClick={() => setPage("about-us")}
          >
            <QuestionMarkCircledIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* <div className="flex gap-2 mx-auto">
        <Button
          variant="outline"
          size="sm"
          // className="ml-auto"
          onClick={() => setPage("porsi-makan")}
        >
          Porsi Makan
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage("rencana-makan")}
        >
          Rencana Makan
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage("asupan-karbohidrat")}
        >
          Asupan Karbohidrat
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage("kualitas-makanan")}
        >
          Kualitas Makanan
        </Button>
      </div> */}

      <div className="flex flex-col justify-center gap-4 h-full">
        <Button
          size="sm"
          className="py-6"
          onClick={() => setPage("tentang-saya")}
        >
          TENTANG SAYA
        </Button>
        <Button size="sm" className="py-6" onClick={() => setPage("diabetes")}>
          DIABETES: APA YANG PERLU SAYA KETAHUI?
        </Button>
        <Button
          size="sm"
          className="py-6"
          onClick={() => setPage("pola-makan-diabetes")}
        >
          POLA MAKAN DIABETES MELITUS TIPE 2
        </Button>
      </div>
    </div>
  );
}
