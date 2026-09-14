import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "ചിത്രശാല & മാധ്യമങ്ങൾ" : "Photo & Media Gallery",
    description: isMl
      ? "അടൂർ മണ്ഡലത്തിലെ വികസന പരിപാടികൾ, പൊതുസമ്മേളനങ്ങൾ, നിയമസഭാ നിമിഷങ്ങൾ എന്നിവയുടെ ചിത്രങ്ങളും വീഡിയോകളും."
      : "Visual archive of constituency events, public programs, assembly sessions, and official engagements of Adv. CV Santhakumar MLA.",
    openGraph: {
      title: isMl ? "ചിത്രശാല | അഡ്വ. സി.വി. ശാന്തകുമാർ" : "Media Gallery | Adv. CV Santhakumar MLA",
      description: isMl
        ? "അടൂർ എം.എൽ.എയുടെ പ്രവർത്തനങ്ങളുടെ ഫോട്ടോകളും വീഡിയോകളും."
        : "Photo and video gallery capturing key moments across Adoor Constituency.",
      images: ["/mla-about.jpeg"],
    },
  };
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
