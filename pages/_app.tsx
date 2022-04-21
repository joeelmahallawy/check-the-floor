import { ChakraProvider, theme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import icon from "../assets/Logo-icon.ico";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
    <Head>
      <title>CheckTheFloor</title>
      <link rel="icon" href={icon.src} />
    </Head>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-226634693-1"
    ></Script>
    <Script id="google-analytics" strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-226634693-1');
        `}
    </Script>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
