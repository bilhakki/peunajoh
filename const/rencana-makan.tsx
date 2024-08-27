import Image from "next/image";

const rencanaMakan = [
  <>
    <ol className="list-decimal">
      <li>
        Rakan, perencanaan makan dapat membantu kadar glukosa darah stabil dan
        dapat memilih makanan menjadi lebih baik. Memasak di rumah memberi rakan
        lebih banyak kontrol atas apa rakan makan, porsi, dan bahan yang
        digunakan. Rakan bisa berkonsultasi dengan tenaga Kesehatan di pelayanan
        Kesehatan seperti puskesmas dan rumah sakit Anda untuk membantu
        mengembangkan rencana makan yang tepat untuk rakan.
      </li>
    </ol>
  </>,
  <>
    <ol start={2} style={{ listStyleType: "decimal", marginLeft: "1rem" }}>
      <li>Beberapa saran untuk memudahkan rakan dalam perencanaan makan:</li>
    </ol>
    <ol style={{ listStyleType: "lower-alpha", marginLeft: "2rem" }}>
      <li>
        Saat berkunjung ke pelayanan Kesehatan (puskesmas dan rumah sakit)
        berdiskusilah dengan tenaga Kesehatan seperti ahli gizi atau perawat
        seperti makanan yang rakan sukai dan bagaimana menggabungkannya dalam
        aktivitas makan sehati-hari rakan
      </li>
      <li>
        Rakan, mulailah hari dengan sarapan/makan pagi. Kegiatan ini akan
        membantu rakan dapat menjaga keinginan makan tetap stabil
      </li>
    </ol>
  </>,
  <>
    <ol start={3} style={{ listStyleType: "lower-alpha", marginLeft: "1rem" }}>
      <li>
        Rakan, usahakan konsumsi makanan dan camilan pada waktu yang sama setiap
        hari. Jadwal makan rakan tetap 3 x makan utama (pagi, siang, sore/malam)
        dan 2 porsi makanan selingan (pagi dan sore) dan makan disarankan dengan
        selang waktu 3 jam sekali
        <Image src="/images/rencana-makan-1.png" width={1000} height={1000} alt="Rencana Makan"></Image>
      </li>
      <li>
        Jangan lupa sesuaikan waktu minum obat diabetes dengan waktu makan ya
        rakan. Obat minum atau terapi insulin bekerja lebih baik untuk
        menstabilkan gula darah jika digunakan pada waktu yang sama setiap hari
      </li>
      <li>
        Saat ini banyak sekali sumber-sumber perencanaan makan yang tersedia
        secara online, rakan bisa memaanfaatkan program tersebut secara rutin
      </li>
    </ol>
  </>,
  <>
    <p>3. Contoh Perencanaan Makan Pasien Diabetes</p>
    <Image src="/images/rencana-makan-2.png" width={1000} height={1000}  alt="Rencana Makan"></Image>
    <Image src="/images/rencana-makan-3.png" width={1000} height={1000}  alt="Rencana Makan"></Image>
  </>,
];

export default rencanaMakan;
