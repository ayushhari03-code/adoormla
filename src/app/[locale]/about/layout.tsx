import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "ജീവചരിത്രം" : "Biography & Journey",
    description: isMl
      ? "അഡ്വ. സി.വി. ശാന്തകുമാർ എം.എൽ.എയുടെ ജീവിതം, വിദ്യാഭ്യാസം, നിയമ വിദ്യാഭ്യാസം, രാഷ്ട്രീയ ജീവിതം."
      : "Biography of Adv. CV Santhakumar MLA, his roots in Konni, education, legal career, and election as Member of Kerala Legislative Assembly for Adoor.",
    openGraph: {
      title: isMl ? "ജീവചരിത്രം | അഡ്വ. സി.വി. ശാന്തകുമാർ" : "Biography | Adv. CV Santhakumar MLA",
      description: isMl
        ? "അഡ്വ. സി.വി. ശാന്തകുമാർ എം.എൽ.എയുടെ ജീവിതവും രാഷ്ട്രീയ പ്രവർത്തനങ്ങളും."
        : "Biography and public life of Adv. CV Santhakumar, MLA representing Adoor Constituency.",
      images: ["/mla-about.jpeg"],
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
