import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "അടൂർ നിയോജകമണ്ഡലം & ആശുപത്രി വിവരങ്ങൾ" : "Adoor Constituency & Emergency Directory",
    description: isMl
      ? "അടൂർ നിയമസഭാ മണ്ഡലം അവലോകനം, പഞ്ചായത്തുകൾ, അടിയന്തര സഹായം, 24/7 ആശുപത്രികൾ, ആംബുലൻസ് നമ്പറുകൾ."
      : "Complete guide to Adoor Assembly Constituency, local panchayats, 24/7 emergency hospitals, ambulance contacts, and administrative directories.",
    openGraph: {
      title: isMl ? "അടൂർ നിയോജകമണ്ഡലം" : "Adoor Constituency Overview & Emergency Directory",
      description: isMl
        ? "അടൂർ മണ്ഡല വിവരങ്ങളും അടിയന്തര സേവനങ്ങളും."
        : "Discover Adoor Constituency, healthcare infrastructure, emergency services, and local administration.",
      images: ["/mla-portrait-2.jpeg"],
    },
  };
}

export default function AdoorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
