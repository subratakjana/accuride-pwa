import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ReactSVG } from "react-svg";
import { I18nLink } from "@Components/Utilities";
import { useRouter } from "next/router";
import styles from "./HeaderDesktop.module.scss";

const SearchDesktop = dynamic(() => import("./SearchDesktop"));
const MiniCart = dynamic(() => import("./MiniCart"));
const TopMenu = dynamic(() => import("./TopMenu"));
const MegaMenu = dynamic(() => import("./MegaMenu"));

const HeaderDesktop = (props) => {
  const router = useRouter();
  const asPath = router.asPath;

  return (
    <>
      {/* header for desktop start */}
      <header
        className={`${styles["acc-header-desktop"]} ${
          !asPath.includes(`/${router.query.zone_lang}/checkout/`)
            ? ""
            : styles["acc-header-desktop-cart"]
        }`}
      >
        {/* top bar start */}
        {!asPath.includes(`/${router.query.zone_lang}/checkout/`) ? (
          <section className={`${styles["acc-header-top-bar"]} bg-dark`}>
            <TopMenu />
          </section>
        ) : null}
        {/* top bar end */}

        {/* sticky header start */}
        <section className={styles["acc-sticky-header"]}>
          <Container>
            <Row>
              {/* logo start */}
              <Col className={styles["acc-desktop-logo-col"]}>
                <I18nLink href="/">
                  <a aria-label="Accuride">
                    <ReactSVG src="/assets/images/accuride-logo-desktop.svg" />
                  </a>
                </I18nLink>
              </Col>
              {/* logo end */}

              {/* menu start */}
              {!asPath.includes(`/${router.query.zone_lang}/checkout/`) ? (
                <Col className="position-initial px-0 px-xxl-3">
                  <MegaMenu megaMenu={props.megaMenu} />
                </Col>
              ) : null}
              {/* menu end */}

              {/* search start */}
              {!asPath.includes(`/${router.query.zone_lang}/checkout/`) ? (
                <Col className={`${styles["acc-desktop-search-col"]} pr-0`}>
                  <SearchDesktop />
                </Col>
              ) : null}
              {/* search end */}

              {/* mini cart start */}
              {!asPath.includes(`/${router.query.zone_lang}/checkout/`) ? (
                <Col className={styles["acc-mini-cart-col"]}>
                  <MiniCart />
                </Col>
              ) : null}
              {/* mini cart end */}
            </Row>
          </Container>
        </section>
        {/* sticky header end */}
      </header>
      {/* header for desktop end */}
    </>
  );
};

export default HeaderDesktop;
