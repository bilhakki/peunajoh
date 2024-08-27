import Image from "next/image";

interface OptionBase {
  label: string;
  responseType: "next" | "explanation";
}

interface OptionWithExplanation extends OptionBase {
  responseType: "explanation";
  responseContent: JSX.Element;
}

interface OptionWithNext extends OptionBase {
  responseType: "next";
  responseContent?: never;
  nextIndex: number;
}

type Option = OptionWithExplanation | OptionWithNext;

interface DiabetesItem {
  type: "confirm" | "explanation";
  content: JSX.Element;
  options?: Option[];
  nextIndex?: number;
}

const diabetes: DiabetesItem[] = [
  // 0 - 1
  {
    type: "confirm",
    content: (
      <>
        <ol start={1} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>
            Apakah rakan mengetahui bahwa saat ini di Indonesia ada sekitar 24
            juta orang mengalami diabetes? Sangat banyak sekali! Jadi, rakan
            tidak sendiri dengan kondisi ini?
          </li>
        </ol>
      </>
    ),
    options: [
      {
        label: "Wah, saya baru tau tentang ini",
        responseType: "next",
        nextIndex: 1,
      },
      {
        label: "Ternyata saya tidak sendiri yang mengalami kondisi ini",
        responseType: "next",
        nextIndex: 1,
      },
    ],
  },

  // 1 - 2
  {
    type: "confirm",
    content: (
      <>
        <ol start={2} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>Rakan, taukah tentang apa itu penyakit diabetes melitus?</li>
        </ol>
      </>
    ),
    options: [
      {
        label: "Saya cukup mengetahui tentang  diabetes",
        responseType: "next",
        nextIndex: 2,
      },
      {
        label: "Saya tau tentang diabetes, tapi tidak terlalu jelas",
        responseType: "next",
        nextIndex: 3,
      },
    ],
  },

  // 2 - 2
  {
    type: "explanation",
    nextIndex: 4,
    content: (
      <>
        <p>
          Ya rakan, saya yakin rakan pasti mengenal diabetes,nah izinkan saya
          menjelaskan lebih detil ya
        </p>
        <br />
        <p>
          Diabetes merupakan penyakit kronis yang mempengaruhi tubuh rakan dalam
          mengubah makanan menjadi energi untuk melakukan aktivitas sehari-hari.
          Pada saat mengalami diabetes, tubuh rakan tidak menghasilkan cukup
          insulin atau tidak dapat menggunakan insulin sebagaimana mestinya
        </p>
      </>
    ),
  },

  // 3 - 2
  {
    type: "explanation",
    nextIndex: 4,
    content: (
      <>
        <p>
          Ya rakan, saya yakin rakan pasti mengenal diabetes,nah izinkan saya
          menjelaskan lebih detil ya
        </p>
        <br />
        <p>
          Diabetes merupakan penyakit kronis yang mempengaruhi tubuh rakan dalam
          mengubah makanan menjadi energi untuk melakukan aktivitas sehari-hari.
          Pada saat mengalami diabetes, tubuh rakan tidak menghasilkan cukup
          insulin atau tidak dapat menggunakan insulin sebagaimana mestinya
        </p>
      </>
    ),
  },

  // 4 - 3
  {
    type: "explanation",
    nextIndex: 5,
    content: (
      <>
        <ol start={3} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>
            Meskipun diabetes sering dianggap sebagai &quot;masalah gula&quot;,
            pada kenyataannya diabetes lebih merupakan &quot;masalah
            insulin&quot;. Nah rakan pasti bertanya-tanya, apa itu insulin.
            Insulin merupakan bahan kimia/ hormon yang dibuat oleh salah satu
            organ tubuh kita yaitu pankreas. Ketika kita makan, tubuh mengubah
            makanan menjadi glukosa (gula) yang digunakan sebagai energi
            sehingga kita mampu melakukan aktivitas sehari-hari. Insulin
            membantu glukosa masuk ke dalam sel-sel tubuh agar bisa digunakan
            sebagai bahan bakar. Tanpa insulin yang cukup, glukosa tetap berada
            dalam darah, menyebabkan kadar gula dalam darah meningkat.
            <Image
              src="/images/diabetes-1.png"
              alt="Diabetes"
              width={1000}
              height={1000}
            ></Image>
          </li>
        </ol>
      </>
    ),
  },

  // 5 - 4
  {
    type: "confirm",
    content: (
      <>
        <ol start={4} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>
            Nah, sekarang silakan rakan menebak, lebih banyak jenis diabetes
            mana yang terjadi? Diabetes melitus tipe 1 (DMT1) atau diabetes
            melitus tipe 2 (DMT2)
          </li>
        </ol>
      </>
    ),
    options: [
      {
        label: "DMT1",
        responseType: "next",
        nextIndex: 6,
      },
      {
        label: "DMT2",
        responseType: "next",
        nextIndex: 7,
      },
    ],
  },

  // 6 - 4
  {
    type: "explanation",
    nextIndex: 8,
    content: (
      <>
        <p>
          Rakan, memang banyak yang mengalami diabetes melitus tipe 1, apalagi
          pada rakan yang usianya masih anak-anak, remaja atau dewasa muda. DMT1
          ini biasanya disebabkan oleh sistem kekebalan yang menyerang sel-sel
          pankreas penghasil insulin sehingga insulin tidak dapat bekerja sama
          sekali.
        </p>
      </>
    ),
  },

  // 7 - 4
  {
    type: "explanation",
    nextIndex: 8,
    content: (
      <>
        <p>
          Benar, Diabetes Melitus Tipe 2 adalah jenis diabetes yang paling
          sering terjadi dimana sekitar 90 % pasien diabetes mengalami jenis
          diabetes tipe 2. DMT2 terjadi karena karena tubuh (pankreas) tidak
          cukup memproduksi atau menggunakan insulin dengan efektif yang
          disebabkan perubahan gaya hidup yang tidak sehat.
        </p>
      </>
    ),
  },

  // 8 - 5
  {
    type: "explanation",
    content: (
      <>
        <ol start={5} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
          <li>
            Nah, kabar baiknya adalah rakan dapat hidup dengan baik meski
            mengalami diabetes. Rakan dapat menjaga kesehatan dengan kombinasi
            dari makanan yang dianjurkan, olahraga sesuai kemampuan rakan dan
            obat yang diberikan tenaga Kesehatan. Karena itulah, kami melalui
            program ini ingin berfokus pada pengetahuan tentang pola makan yang
            dianjurkan bagi pasien diabetes. Dengan rakan memahami hal tersebut,
            rakan dapat mengontrol gula darah dan dapat mengurangi hal hal yang
            tidak menyenangkan dari diabetes
          </li>
        </ol>
      </>
    ),
  },
];

export default diabetes;
