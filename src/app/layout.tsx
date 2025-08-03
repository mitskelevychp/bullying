import { Header, Footer } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import "./globals.css";
// import Script from "next/script";

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="uk">
      <head>
        {/* cookies TODO: */}
        {/* Consent Mode default settings */}
        {/* <script data-cookieconsent="ignore">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag("consent", "default", {
              ad_personalization: "denied",
              ad_storage: "denied",
              ad_user_data: "denied",
              analytics_storage: "denied",
              functionality_storage: "denied",
              personalization_storage: "denied",
              security_storage: "granted",
              wait_for_update: 500
            });
            gtag("set", "ads_data_redaction", true);
            gtag("set", "url_passthrough", false);
          `}
        </script> */}
        {/* TODO: */}
        {/* Google Tag Manager */}
        {/* <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MXVM9T28');
            `,
          }}
        /> */}
        {/* TODO: */}
        {/* ReCaptcha */}
        {/* <Script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LdtgmkrAAAAAF90jlSOUcng0eJMtTMcfTjE257B"
          strategy="afterInteractive"
        /> */}
        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // TODO:
              "@type": "Person",
              // TODO:
              name: "ForBiz UA (Sole Proprietor: Pavlo Mitskelevych)",
              // TODO:
              url: "https://forbiz.website",
              // TODO:
              image: "https://forbiz.website/images/logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                // TODO:
                telephone: "+380506019021",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased flex flex-col items-center m-0-auto">
        {/* TODO: */}
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXVM9T28"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}

        <Header />
        <main className="w-full relative z-0">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
