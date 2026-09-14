import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "നിയമസഭാ പ്രവർത്തനങ്ങൾ" : "Legislative Work & Assembly Questions",
    description: isMl
      ? "കേരള നിയമസഭയിൽ അടൂരിന്റെ ശബ്ദമായി അഡ്വ. സി.വി. ശാന്തകുമാർ എം.എൽ.എ ഉന്നയിച്ച ചോദ്യങ്ങൾ, ചർച്ചകൾ, സഭാ ഇടപെടലുകൾ."
      : "Transparent record of legislative interventions, assembly questions, policy debates, and bills reviewed in the Kerala Legislative Assembly by Adv. CV Santhakumar MLA.",
    openGraph: {
      title: isMl ? "നിയമസഭാ പ്രവർത്തനങ്ങൾ | അഡ്വ. സി.വി. ശാന്തകുമാർ" : "Legislative Work | Adv. CV Santhakumar MLA",
      description: isMl
        ? "കേരള നിയമസഭയിലെ ഇടപെടലുകളും ചോദ്യങ്ങളും."
        : "Record of parliamentary questions and debates representing Adoor constituency in Kerala Niyamasabha.",
      images: ["/mla-portrait-2.jpeg"],
    },
  };
}

export default function LegislativeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
