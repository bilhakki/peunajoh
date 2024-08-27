import { Page } from "@/hooks/usePage";

interface OptionBase {
  label: string;
  responseType: "next" | "redirect";
}

interface OptionWithNext extends OptionBase {
  responseType: "next";
  nextIndex: number;
}

interface OptionWithRedirect extends OptionBase {
  responseType: "redirect";
  page: Page;
}

type Option = OptionWithNext | OptionWithRedirect;

interface PolaMakanItem {
  content: JSX.Element;
  options?: Option[];
}


const polaMakanDiabetes: PolaMakanItem[] = [
  {
    content: (
      <>
        <ol start={1} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>
            Rakan tetap bisa menikmati makanan favorit sambil mengelola
            diabetes. Semakin rakan memahami makanan, semakin mudah rakan
            membuat pilihan terbaik tentang apa, kapan, dan seberapa banyak yang
            harus dimakan. Pilihan sehat akan membantu menjaga kadar glukosa
            tetap aman. Jadi, apa arti makan sehat bagi rakan?
          </li>
        </ol>
      </>
    ),
    options: [
      {
        label: "makanan enak namun tetap dapat menjaga gula darah stabil",
        responseType: "next",
        nextIndex: 1,
      },
      {
        label: "makanan yang mendukung kesehatan dan dianjurkan dalam diabetes",
        responseType: "next",
        nextIndex: 1,
      },
    ],
  },
  {
    content: (
      <>
        <p>
          Benar rakan, makanan sehat dalam diabetes tetaplah harus yang enak,
          bisa dinikmati dan yang mengikuti anjuran Kesehatan untuk pasien
          diabetes
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <ol start={2} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>
            Rakan, terdapat empat poin penting yang harus kita pahami dalam
            mengontrol pola makan kita sebagai penderita diabetes yaitu:
            mengatur jumlah makanan yang dikonsumsi, menentukan jenis dan waktu
            makan, memilih makanan yang sehat untuk tubuh, serta memantau asupan
            karbohidrat. Rakan ingin mengetahui lebih detil yang mana?
          </li>
        </ol>
      </>
    ),
    options: [
      {
        label: "Porsi Makan",
        responseType: "redirect",
        page: "porsi-makan",
      },
      {
        label: "Rencana Makan",
        responseType: "redirect",
        page: "rencana-makan",
      },
      {
        label: "Asupan Karbohidrat",
        responseType: "redirect",
        page: "asupan-karbohidrat",
      },
      {
        label: "Kualitas Makanan",
        responseType: "redirect",
        page: "kualitas-makanan",
      },
    ],
  },
];

export default polaMakanDiabetes;
