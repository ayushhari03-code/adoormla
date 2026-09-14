import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "ജനസേവന പോർട്ടൽ & പരാതി പരിഹാരം" : "Citizen Services & Grievances | Adoor Sparsham",
    description: isMl
      ? "അടൂർ നിയോജകമണ്ഡലം ജനസേവന പോർട്ടൽ. പരാതികൾ സമർപ്പിക്കുക, സഹായം അഭ്യർത്ഥിക്കുക, കൂടിക്കാഴ്ച സമയം ചോദിക്കുക, സ്റ്റാറ്റസ് പരിശോധിക്കുക."
      : "Official citizen services and grievance redressal portal for Adoor constituency. Submit grievances, request assistance, and track status with your Reference ID.",
    openGraph: {
      title: isMl ? "അടൂർ സ്പർശം - ജനസേവന പോർട്ടൽ" : "Adoor Sparsham - Citizen Services & Grievance Redressal",
      description: isMl
        ? "അടൂർ മണ്ഡലത്തിലെ ജനങ്ങൾക്ക് എം.എൽ.എ ഓഫീസുമായി നേരിട്ട് ബന്ധപ്പെടാനുള്ള ഡിജിറ്റൽ സംവിധാനം."
        : "A next-generation digital public office for the citizens of Adoor Assembly Constituency.",
      images: ["/mla-portrait-1.jpeg"],
    },
  };
}

export default function PublicServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
