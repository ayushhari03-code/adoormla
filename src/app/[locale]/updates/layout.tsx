import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "വാർത്തകൾ & അറിയിപ്പുകൾ" : "Constituency News & Updates",
    description: isMl
      ? "അടൂർ നിയോജക മണ്ഡലത്തിൽ നിന്നുള്ള ഏറ്റവും പുതിയ വാർത്തകൾ, പത്രക്കുറിപ്പുകൾ, വരാനിരിക്കുന്ന പരിപാടികൾ."
      : "Latest press releases, constituency news, official announcements, and upcoming events from the Office of Adv. CV Santhakumar MLA.",
    openGraph: {
      title: isMl ? "വാർത്തകൾ | അഡ്വ. സി.വി. ശാന്തകുമാർ" : "News & Updates | Adv. CV Santhakumar MLA",
      description: isMl
        ? "അടൂർ മണ്ഡലത്തിലെ ഏറ്റവും പുതിയ വാർത്തകളും വിവരങ്ങളും."
        : "Official news and press updates from Adoor MLA Adv. CV Santhakumar.",
      images: ["/mla-portrait-2.jpeg"],
    },
  };
}

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
