import { useState } from "react";
import { Container } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(import("@Components/Utilities/HTMLContent"));
const Banner = dynamic(import("@Components/Markets/Banner"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const CaliforniaProp65 = ({ CaliforniaProp65es }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumb
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("#")[0],
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
      },
    ];
  }
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {CaliforniaProp65es
        ? CaliforniaProp65es.map((rows) => (
            <div key={`cfn_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-small-banner"
              />
              <section className="section-padding">
                <Container>
                  <NextImage
                    src={rows.section1image.url}
                    alt=""
                    layout="intrinsic"
                    objectFit="contain"
                    objectPosition="center"
                    width={57}
                    height={51}
                    key={rows.section1image.id}
                    className="w-10"
                  />
                  <p> </p>
                  <HTMLContent
                    className="m-0"
                    content={rows.section2description.html}
                  />
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default CaliforniaProp65;
