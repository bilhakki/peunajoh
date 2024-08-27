import Image from "next/image";

const kualitasMakanan = [
  <>
    <ol start={1} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
      <li>
        Rakan, makan sehat mencakup beragam makanan. Ketika tubuh tidak
        mendapatkan nutrisi yang dibutuhkannya, rakan akan merasa lapar. Pilihan
        makanan yang lebih sehat memberi tubuh rakan vitamin dan mineral yang
        diperlukan
      </li>
    </ol>
  </>,
  <>
    <ol start={2} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
      <li>Beberapa cara untuk memilih makanan yang berkualitas:</li>
    </ol>
    <ol style={{ listStyleType: "lower-alpha", marginLeft: "2rem" }}>
      <li>
        Rakan, pilihlah makanan yang alamai dan tanpa proses pengolahan yang
        Panjang. Makanan yang diolah dirumah lebih baik untuk rakan. Jika
        memilih makanan yang tersedia di pasar, perhatikan bahan-bahannya
      </li>
      <li>
        Konsumsi sayuran juga dapat menambah tekstur, rasa, dan warna ekstra
        pada makanan dan camilan sehari-hari
      </li>
      <li>
        Perhatikan jumlah Garam dalam makanan yang tidak diolah dirumah/makanan
        olahan. Pilih makanan yang rendah kalori, lemak, gula, dan garam
      </li>
      <li>
        Rakan, lebih banyaklah untuk minum air putih dibandingkan air bewarna
        seperti air sirup, kopi, teh, dan soda
      </li>
      <li>
        Jika harus memakai minyak dalam mengolah makanan, maka gunakan dalam
        jumlah kecil sehingga makanan yang rakan konsumsi tidak terlalu tinggi
        lemak
      </li>
      <li>Sedikit gula untuk bumbu dalam masakan diperbolehkan.</li>
    </ol>
  </>,
  <>
    <Image
      src="/images/kualitas-makan.png"
      width={1000}
      height={1000}
      alt="Kualitas Makan"
    ></Image>
  </>,
];

export default kualitasMakanan