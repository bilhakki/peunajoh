interface BaseQuestion {
  question: string;
  inputType: string;
}

interface PlaceholderQuestion extends BaseQuestion {
  placeholder: string;
  defaultValue?: string | number;
}

 interface OptionQuestion extends BaseQuestion {
  options: string[];
}

export type Question =
  | (PlaceholderQuestion & { inputType: "string" | "number" })
  | (OptionQuestion & { inputType: "option" | "radio" });

const tentangSaya: Question[] = [
  {
    question: "Apa jenis kelamin rakan?",
    inputType: "option",
    options: ["Laki-laki", "Perempuan"],
  },
  {
    question: "Berapa umur rakan?",
    inputType: "number",
    placeholder: "umur dalam tahun",
  },
  {
    question: "Apa pekerjaan rakan?",
    inputType: "string",
    defaultValue: "Tidak bekerja",
    placeholder: "jika tidak bekerja isi dengan 'Tidak bekerja'",
  },
  {
    question: "Sejak Kapan Mengetahui Rakan Diabetes?",
    inputType: "option",
    options: ["Kurang dari 5 tahun", "Lebih dari 5 tahun"],
  },
  {
    question: "Apakah tipe/jenis obat yang rakan konsumsi saat ini?",
    inputType: "option",
    options: [
      "Tidak minum obat",
      "Obat minum",
      "Insulin",
      "Campuran Obat Minum dan Insulin",
    ],
  },
  {
    question: "Pernahkah rakan mendapat informasi terkait diabetes?",
    inputType: "option",
    options: ["Pernah", "Tidak pernah"],
  },
  {
    question:
      "Pernahkah rakan mendapat informasi terkait diet atau nutrisi dalam diabetes?",
    inputType: "option",
    options: ["Pernah", "Tidak pernah"],
  },
  {
    question: "Nilai Kadar Gula Darah Sewaktu/KGDS yang pernah diperiksa?",
    inputType: "number",
    defaultValue: "0",
    placeholder: "Nilai kadar gula darah rakan",
  },
];

export default tentangSaya;
