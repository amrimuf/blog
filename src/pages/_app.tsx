import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-82P19X1H2Y"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-82P19X1H2Y', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
    <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  );
}

export default MyApp;