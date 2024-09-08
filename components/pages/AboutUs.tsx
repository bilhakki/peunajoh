import React from "react";
import { Button } from "../ui/button";
import { usePage } from "@/hooks/usePage";

export default function AboutUs() {
  const setPage = usePage((state) => state.setPage);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 pb-0">
      <div className="bg-white flex-1 rounded text-sm p-4 overflow-y-auto space-y-4 text-justify">
        <p>
          <span className="text-blue-700">Peunajoh.id</span> adalah aplikasi
          inovatif yang dirancang untuk memudahkan para diabetisi dan keluarga
          dalam mengakses informasi penting terkait pola makan yang sesuai untuk
          penderita diabetes. Dengan{" "}
          <span className="text-blue-700">peunajoh.id</span>{" "}
          Anda akan mendapatkan informasi nutrisi yang tepat dan rekomendasi
          makanan yang sehat, membantu Anda dalam mengelola diabetes dengan
          lebih baik. Aplikasi ini tidak hanya menjadi salah satu sumber
          informasi yang dapat dipercayai, tetapi juga menjadi teman setia dalam
          perjalanan Anda menuju gaya hidup yang lebih sehat.
        </p>
        <p>
          Aplikasi <span className="text-blue-700">Peunajoh.id</span> merupakan
          hasil kolaborasi antara Tim Peneliti STIKes Medika Seramoe Barat dan
          Direktorat Riset, Teknologi, dan Pengabdian kepada Masyarakat (DRTPM)
          Kemdikbudristek 2024.
        </p>
        <p>
          Untuk informasi lebih lanjut, silakan hubungi:
          <a
            href="mailto:rizkiandriani@stikesmsb.ac.id"
            className="text-blue-700"
          >
            rizkiandriani@stikesmsb.ac.id
          </a>
        </p>
      </div>

      <div className="absolute bottom-4 right-4 z-20">
        <Button
          onClick={() => {
            setPage("home");
          }}
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}
