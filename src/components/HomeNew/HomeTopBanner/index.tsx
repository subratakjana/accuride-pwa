import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

const HomeTopBanner = (props) => {
  const { data, mobileData } = props;
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  const pathName = router.asPath;
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    setTimeout(() => {
      if (pathName === "/en-us") {
        const bannerVideoID = document.getElementById("vid");
        if (bannerVideoID) {
          bannerVideoID.play();
        }
      }
    }, 1000);
  }, []);
  // cards
  return (
    <>
      {data ? (
        <section>
          {windowObj && windowSize.width < 767 ? (
            <div className="acc-home-banner">
              <I18nLink href="/products/shop" isMagentoRoute={1}>
                <Image
                  priority
                  src={mobileData.url}
                  alt=""
                  layout="fill"
                  size="100%"
                  className="acc-home-banner-image"
                />
              </I18nLink>
              <Container className="mt-auto acc-home-banner-content">
                <span className="d-block bounce">
                  <span className="scroll-down">
                    <ReactSVG src="/assets/images/icons/arrow-down.svg" />
                  </span>
                </span>
              </Container>
            </div>
          ) : (
            <>
              <div className="embed-responsive embed-responsive-21by9 acc-ban-vid">
                <video
                  className="embed-responsive-item object-cover"
                  width="100%"
                  height="100%"
                  autoPlay
                  muted
                  loop
                  id="vid"
                >
                  <source src={data.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </>
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeTopBanner;
