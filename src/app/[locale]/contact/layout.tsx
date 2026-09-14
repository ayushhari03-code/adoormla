import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMl = locale === 'ml';

  return {
    title: isMl ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact Constituency Office",
    description: isMl
      ? "അടൂർ എം.എൽ.എ ഓഫീസുമായി ബന്ധപ്പെടുക. ഫോൺ: +91 94475 04529, ഇമെയിൽ: cvsanthakumar@niyamasabha.nic.in, ഓഫീസ് വിലാസം, മാപ്പ്."
      : "Contact the office of Adv. CV Santhakumar MLA. Office address in Adoor Town, phone +91 94475 04529, email, WhatsApp, and visiting hours.",
    openGraph: {
      title: isMl ? "ഓഫീസുമായി ബന്ധപ്പെടുക | അഡ്വ. സി.വി. ശാന്തകുമാർ" : "Contact Office | Adv. CV Santhakumar MLA",
      description: isMl
        ? "അടൂർ എം.എൽ.എ ഓഫീസുമായി നേരിട്ട് ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ."
        : "Reach out to the constituency office for appointments, inquiries, and public assistance.",
      images: ["/mla-portrait-2.jpeg"],
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
