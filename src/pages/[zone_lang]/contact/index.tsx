import AllForms from "@PageContent/Contact/AllForms";

const AllFormsPage = () => <AllForms />;

export const getStaticProps = async () => {
  const markupTemplate = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Accuride",
    url: "https://www.accuride.com",
    logo: `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/accuride-logo-desktop.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12311 Shoemaker Avenue",
      addressLocality: "Santa Fe Springs",
      addressRegion: "California",
      postalCode: "90670",
      addressCountry: "United States",
    },
    telephone: "888-491-7112",
  };
  const seodata = {
    seoTitle: "Contact",
    seoDescription:
      "Get in touch with Accuride for product support, sales inquiries, or general questions. Our team is ready to assist you with all your needs.",
    secKeywords: "",
    markupTemplate: markupTemplate,
  };

  return {
    props: { seodata },
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default AllFormsPage;
