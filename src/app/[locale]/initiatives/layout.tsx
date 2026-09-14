import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "വികസന പദ്ധതികൾ" : "Development Initiatives & Projects",
    description: isMl
      ? "അടൂർ നിയോജക മണ്ഡലത്തിലെ സമഗ്ര വികസന പദ്ധതികൾ, റോഡ്, പാലം, ആരോഗ്യ, വിദ്യാഭ്യാസ അടിസ്ഥാന സൗകര്യ പ്രവർത്തനങ്ങൾ."
      : "Explore verified development projects, public infrastructure, healthcare, education, and community initiatives across Adoor Assembly Constituency led by Adv. CV Santhakumar MLA.",
    openGraph: {
      title: isMl ? "വികസന പദ്ധതികൾ | അടൂർ എം.എൽ.എ" : "Development Initiatives | Adoor MLA Adv. CV Santhakumar",
      description: isMl
        ? "അടൂർ മണ്ഡലത്തിലെ വികസന പദ്ധതികളുടെ പുരോഗതി അറിയുക."
        : "Track progress and verified updates on key infrastructure and public welfare projects across Adoor.",
      images: ["/mla-portrait-2.jpeg"],
    },
  };
}

export default function InitiativesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
