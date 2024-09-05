import React from "react";

import Home from "@PageContent/Home";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { homePageV3 } from "@Graphql/queriesgraphcms/homeV3.graphql";
import DESKTOP_MEGA_MENU from "@Graphql/queriesgraphcms/getDesktopMegaMenu.graphql";
import { footer } from "@Graphql/queriesgraphcms/getFooterDetials.graphql";

function HomePage({ homeNew }) {
  if (typeof window !== "undefined") {
    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }
  return <Home homeNew={homeNew} />;
}

export const getStaticProps = async (context) => {
  const queryParams = context.params;

  let notFound = false;
  let seodata = null;

  let megaMenu = { desktopMegaMenus: [] };
  let footerMenu = { footerMenus: [] };

  const getQueryData = gqlFetch(homePageV3, {}, "CMS");
  const geSeotQueryData = {
    data: {
      cmsPage: {
        meta_title:
          "Global Manufacturer of Premium Ball-Bearing Drawer Slides | Accuride International",
        meta_description:
          "60 years of expertise in designing and manufacturing motion hardware and global experts in drawer slides & movement solution design and supply used in: drawers, cabinetry, technical applications, industrial equipment, and more.",
        meta_keywords: "",
      },
    },
  };

  const megaMenuPromise = gqlFetch(
    DESKTOP_MEGA_MENU,
    { languages: "English", pageSlug: "megamenu" },
    "CMS",
    queryParams.zone_lang,
  );

  const footerMenuPromise = gqlFetch(
    footer,
    { languages: "English" },
    "CMS",
    queryParams.zone_lang,
  );

  const [homePageContent, cmsPageInfo, megaMenuData, footerMenuData] =
    await Promise.all([
      getQueryData,
      geSeotQueryData,
      megaMenuPromise,
      footerMenuPromise,
    ]).catch((e) => console.log(e));

  const homeNew = homePageContent && homePageContent.data.homeV3S;
  const pageInfo = cmsPageInfo && cmsPageInfo.data.cmsPage;

  megaMenu = megaMenuData?.data;
  footerMenu = footerMenuData?.data;

  if (pageInfo) {
    seodata = {
      seoTitle: pageInfo.meta_title,
      seoDescription: pageInfo.meta_description,
      secKeywords: pageInfo.meta_keywords,
    };
  }

  if (!homeNew) notFound = true;

  return {
    props: { homeNew, seodata, megaMenu, footerMenu },
    notFound,
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { zone_lang: "en-us" } }],
    fallback: "blocking",
  };
}

export default HomePage;
