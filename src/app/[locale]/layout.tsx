import type { Metadata } from "next";
import { Inter, Noto_Sans_Malayalam } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/navigation/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const malayalam = Noto_Sans_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoormla.in';
  const isMl = locale === 'ml';

  const title = isMl
    ? "അഡ്വ. സി.വി. ശാന്തകുമാർ | അടൂർ എം.എൽ.എ"
    : "Adv. CV Santhakumar | MLA Adoor Official Website";

  const description = isMl
    ? "അടൂർ നിയമസഭാ മണ്ഡലം എം.എൽ.എ അഡ്വ. സി.വി. ശാന്തകുമാറിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റ്. അടൂർ സ്പർശം പൊതുസേവനം, വികസന പദ്ധതികൾ, പരാതി പരിഹാരം."
    : "Official website of Adv. CV Santhakumar, Member of Kerala Legislative Assembly representing Adoor Constituency. Public services, initiatives, and grievance redressal.";

  const keywords = [
    "Adv. CV Santhakumar",
    "CV Santhakumar MLA",
    "Adoor MLA",
    "Adoor Assembly Constituency",
    "Kerala Legislative Assembly",
    "Pathanamthitta MLA",
    "Indian National Congress",
    "Adoor Sparsham",
    "Adoor Public Service",
    "അഡ്വ. സി.വി. ശാന്തകുമാർ",
    "അടൂർ എംഎൽഎ",
    "അടൂർ നിയോജകമണ്ഡലം",
    "അടൂർ സ്പർശം",
    "പത്തനംതിട്ട",
  ];

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | Adv. CV Santhakumar MLA`,
    },
    description,
    keywords,
    authors: [{ name: "Adv. CV Santhakumar", url: baseUrl }],
    creator: "Office of Adv. CV Santhakumar MLA",
    publisher: "Logsphere Technologies",
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ml: `${baseUrl}/ml`,
      },
    },
    openGraph: {
      type: "website",
      locale: isMl ? "ml_IN" : "en_IN",
      url: `${baseUrl}/${locale}`,
      siteName: "Adv. CV Santhakumar | MLA Adoor",
      title,
      description,
      images: [
        {
          url: "/mla-portrait-2.jpeg",
          width: 1200,
          height: 630,
          alt: "Adv. CV Santhakumar MLA Adoor",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/mla-portrait-2.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/logo-circle.png",
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://adoormla.in/#person",
        "name": "Adv. CV Santhakumar",
        "alternateName": ["സി.വി. ശാന്തകുമാർ", "CV Santhakumar MLA"],
        "jobTitle": "Member of the Kerala Legislative Assembly (MLA)",
        "description": "Member of the Kerala Legislative Assembly representing Adoor Constituency.",
        "url": "https://adoormla.in",
        "image": "https://adoormla.in/mla-portrait-2.jpeg",
        "telephone": "+91 94475 04529",
        "email": "cvsanthakumar@niyamasabha.nic.in",
        "sameAs": [
          "https://www.facebook.com/share/14k3JuxjfVX/",
          "https://www.instagram.com/c_v_santhakumar_mla/"
        ],
        "worksFor": {
          "@type": "GovernmentOrganization",
          "name": "Kerala Legislative Assembly",
          "url": "http://www.niyamasabha.nic.in/"
        }
      },
      {
        "@type": "GovernmentOffice",
        "@id": "https://adoormla.in/#office",
        "name": "MLA Office, Adoor",
        "description": "Constituency Office of Adv. CV Santhakumar MLA",
        "telephone": "+91 94475 04529",
        "email": "cvsanthakumar@niyamasabha.nic.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "MLA Office, Adoor Town",
          "addressLocality": "Adoor",
          "addressRegion": "Kerala",
          "postalCode": "691523",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "9.1604079",
          "longitude": "76.7297834"
        },
        "url": "https://adoormla.in"
      }
    ]
  };

  return (
    <html lang={locale} className={`${inter.variable} ${malayalam.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <Nav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
