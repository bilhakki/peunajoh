"use client";

// import Home from "@/components/pages/Home";
import { usePage } from "@/hooks/usePage";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Home = dynamic(() => import("@/components/pages/Home"), {
  ssr: false,
});
const PorsiMakan = dynamic(() => import("@/components/pages/PorsiMakan"), {
  ssr: false,
});
const RencanaMakan = dynamic(() => import("@/components/pages/RencanaMakan"), {
  ssr: false,
});
const AsupanKarbohidrat = dynamic(
  () => import("@/components/pages/AsupanKarbohidrat"),
  {
    ssr: false,
  }
);
const KualitasMakanan = dynamic(
  () => import("@/components/pages/KualitasMakanan"),
  {
    ssr: false,
  }
);
const OnBoarding = dynamic(() => import("@/components/pages/OnBoarding"), {
  ssr: false,
});
const Diabetes = dynamic(() => import("@/components/pages/Diabetes"), {
  ssr: false,
});
const PolaMakanDiabetes = dynamic(
  () => import("@/components/pages/PolaMakanDiabetes"),
  {
    ssr: false,
  }
);
const TentangSaya = dynamic(() => import("@/components/pages/TentangSaya"), {
  ssr: false,
});
export const ContentBuilder = () => {
  const { page, setPage } = usePage((state) => state);
  
  useEffect(() => {
    const alreadyOnBoarding: boolean = localStorage.getItem("onboarding") === "true";

    if (!!!alreadyOnBoarding) {
      setPage("on-boarding");
    }
  }, [])

  switch (page) {
    case "on-boarding":
      return <OnBoarding />;
    case "home":
      return <Home />;

    // Explaintion
    case "porsi-makan":
      return <PorsiMakan />;

    case "rencana-makan":
      return <RencanaMakan />;
    case "asupan-karbohidrat":
      return <AsupanKarbohidrat />;
    case "kualitas-makanan":
      return <KualitasMakanan />;
    case "diabetes":
      return <Diabetes />;
    case "pola-makan-diabetes":
      return <PolaMakanDiabetes />;
    case "tentang-saya":
      return <TentangSaya />;

    // Quiz

    default:
      return <></>;
      break;
  }
};
