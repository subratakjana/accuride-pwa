import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import useWindowDimensions from "@Hooks/windowDimention";
import OneSignal from "react-onesignal";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import styles from "./News.module.scss";

const NewsCategoryMenu = dynamic(() => import("@Components/NewsCatMenu"));
const NewsList = dynamic(() => import("@Components/News/NewsList"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Newsrooms = ({ newsLists }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [isInitOneSignal, setIsInitOneSignal] = useState(false);
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      { url: "", name: pathSegments[1], isClickable: false },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
        isClickable: false,
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
        isClickable: false,
      },
    ];
  }
  const callOneSignalPush = () => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APPID, // STEP 9
      notifyButton: {
        enable: true,
      },
      promptOptions: {
        slidedown: {
          enabled: true,
          actionMessage:
            "Allow Notifications for updates on product promotions and more from Accuride",
          acceptButtonText: "Allow",
          cancelButtonText: "Cancel",
        },
      },
      welcomeNotification: {
        title: "One Signal",
        message: "Thanks for subscribing!",
      },
    }).then(() => {
      setIsInitOneSignal(true);
    });
  };

  useEffect(() => {
    if (useEffect.width !== 0) updateWindowObj(true);
    if (!isInitOneSignal)
      setTimeout(() => {
        callOneSignalPush();
      }, 2000);
  }, [windowObj]);

  const clickScrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const getNewsLists = newsLists.find((item) => item.pages.length > 0) || [];
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <div
        className={`${styles["news-scroll-top-btn"]} d-xl-block d-none position-fixed`}
        role="button"
        tabIndex="0"
        onClick={clickScrollTop}
        onKeyDown={clickScrollTop}
      >
        <FaRegArrowAltCircleUp />
      </div>
      {getNewsLists
        ? getNewsLists.pages.map((EachPage) => (
            <section
              key={`banner_${EachPage.banner.id}`}
              className={`${styles["acc-news-main-banner"]} ${styles["acc-small-banner"]} position-relative`}
            >
              <Container>
                <article
                  className={`position-absolute ${
                    styles["acc-banner-caption"]
                  } z-index-1 ${
                    windowObj && windowSize.width > 768 ? "w-50" : ""
                  }`}
                >
                  {EachPage.banner.bannerHeading ? (
                    <h2 className="text-white">
                      {EachPage.banner.bannerHeading}
                    </h2>
                  ) : (
                    ""
                  )}
                  {EachPage.banner.bannerDescription ? (
                    <p className="text-white">
                      {EachPage.banner.bannerDescription}
                    </p>
                  ) : (
                    ""
                  )}
                </article>
              </Container>
              {EachPage.banner.bannerImage
                ? EachPage.banner.bannerImage.map((bannerimage) => (
                    <ResponsiveEmbed aspectRatio="1by1">
                      <NextImage
                        src={bannerimage.url}
                        alt={EachPage.banner.bannerHeading}
                        objectFit="cover"
                        objectPosition="center"
                        layout="fill"
                        key={bannerimage.id}
                      />
                    </ResponsiveEmbed>
                  ))
                : ""}
            </section>
          ))
        : ""}
      {newsLists && newsLists.length > 0 ? (
        <>
          <NewsCategoryMenu data={newsLists[0]} />
          <section className="section-padding acc-blog-page">
            <Container>
              <NewsList data={newsLists} />
            </Container>
          </section>
        </>
      ) : null}
    </>
  );
};

export default Newsrooms;
