import Head from "next/head";

const SiteHead = ({ children }) => {
  return (
    <Head>
      {/* Name page dynamic */}
      <title>{children.type.name} | Barraca da Fofoca</title>

      {/* Meta tags */}
      <meta name="keywords" content="barraca da fofoca" />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Merienda+One&family=Playfair+Display:wght@400;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}

export default SiteHead;