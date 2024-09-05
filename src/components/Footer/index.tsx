import Image from 'next/legacy/image';
import { I18nLink } from '@Components/Utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';
import { footer } from '@Graphql/queriesgraphcms/getFooterDetials.graphql';
import gqlFetch from '@Graphql/Utilities/gqlFetch';
import { ReactSVG } from 'react-svg';
import styles from './Footer.module.scss';
import usePageHeight from './usePageHeight';
import EmailSubscriptionFooter from '@Components/EmailSubscriptionFooter';

const Footer = () => {
  const [footerMenu, setFooterMenu] = useState([]);
  const [otherMenu, setOtherMenu] = useState([]);
  const [otherStoresMenu, setOtherStoresMenu] = useState([]);
  const [socialLinksMenu, setSocialLinksMenu] = useState([]);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [hasClick, setHasClick] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);
  const copyrightText = `©${new Date().getFullYear()} ACCURIDE INTERNATIONAL INC`;
  const isShortPage = usePageHeight();

  useEffect(() => {
    if (isShortPage) {
      setHasScrolled(true);
    }
  }, [isShortPage]);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    const handleScroll = () => {
      setHasScrolled(true);
      window.removeEventListener('scroll', handleScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clickOnFocus = () => {
    setHasClick(hasClick + 1);
  };

  const fetchFooterMenu = async () => {
    const getData = await gqlFetch(footer, { languages: 'English' }, 'CMS');
    if (getData) {
      setFooterMenu(getData?.data?.footerMainMenus);
      setOtherMenu(getData?.data?.footerOtherMenus);
      setOtherStoresMenu(getData?.data?.otherStoresMenus);
      setSocialLinksMenu(getData?.data?.socialLinksMenus);
    } else {
      fetch('/static/footer.json')
        .then(async (res) => {
          const getRes = await res.json();
          setFooterMenu(getRes?.footerMainMenus ?? []);
          setOtherMenu(getRes?.footerOtherMenus ?? []);
          setOtherStoresMenu(getRes?.otherStoresMenus ?? []);
          setSocialLinksMenu(getRes?.socialLinksMenus ?? []);
        })
        .catch((err) => console.log('err', err));
    }
  };

  useEffect(() => {
    if (footerMenu && footerMenu.length === 0) {
      fetchFooterMenu();
    }
  }, []);

  return (
    hasScrolled && (
      <>
        <section
          className={`${styles['site-footer']} py-4 py-md-5 px-4 px-xl-0 ${
            windowObj && windowSize.width > 1024
              ? styles['acc-footer-wrap']
              : ''
          }`}
        >
          <Container>
            <Row className="justify-content-between">
              <Col xs={12} md={6} lg={8} className="mb-4">
                {/* start logo */}
                <div
                  className={`${styles['acc-footer-logo-wrap']} mb-3 mb-md-4 mb-lg-5 text-center`}
                >
                  <I18nLink prefetch={false} href="/">
                    <a aria-label="footer-logo">
                      <Image
                        src="/assets/images/accuride-footer-logo.png"
                        width={413}
                        height={99}
                        className={styles['acc-footer-logo']}
                        alt="Accuride"
                        layout="intrinsic"
                      />
                    </a>
                  </I18nLink>
                </div>
                {/* end logo */}

                {/* email start */}
                <div
                  className={`${styles['acc-footer-emailsubs-area']} d-flex justify-content-center mb-lg-3`}
                >
                  {windowObj && windowSize.width > 1024 ? (
                    <EmailSubscriptionFooter hasClick={hasClick} />
                  ) : null}
                </div>
                {/* email end */}

                {/* menu for mobile start */}
                {windowObj &&
                  windowSize.width < 768 &&
                  footerMenu &&
                  footerMenu.length &&
                  footerMenu.map((footerMainMenuItem) => (
                    <div key={footerMainMenuItem.id} className="mb-4">
                      <span className="d-block border-bottom border-light pb-2 mb-2">
                        <I18nLink
                          href={footerMainMenuItem.pageSlugUrl}
                          isMagentoRoute={0}
                        >
                          <a className="text-white h3 font-weight-500 text-uppercase">
                            {' '}
                            {footerMainMenuItem.menuTitle}{' '}
                          </a>
                        </I18nLink>
                      </span>
                      <ul>
                        {' '}
                        {footerMainMenuItem.footerSubMenus.length &&
                          footerMainMenuItem.footerSubMenus.map(
                            (footerSubMenuItem) => (
                              <li
                                className="p-0 h3 font-weight-400 border-bottom border-light pb-2 mb-2"
                                key={footerSubMenuItem.id}
                              >
                                <I18nLink
                                  href={footerSubMenuItem.pageSlugUrl}
                                  isMagentoRoute={0}
                                >
                                  <a className="text-white">
                                    {' '}
                                    {footerSubMenuItem.menuTitle}{' '}
                                  </a>
                                </I18nLink>
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  ))}
                {/* menu for mobile end */}

                {/* socialnetworks start */}
                <div className={styles['acc-footer-emailsubs-social-area']}>
                  {socialLinksMenu.length > 0 ? (
                    <ul className={styles['footer-social']}>
                      {socialLinksMenu.map((socialLinksMenuItem) => (
                        <li key={socialLinksMenuItem.id}>
                          <a
                            href={socialLinksMenuItem.socialLinkUrl}
                            target={
                              socialLinksMenuItem.openInNewTab === true
                                ? '_blank'
                                : '_self'
                            }
                            aria-label="link"
                            prefetch="false"
                            rel="noopener noreferrer"
                          >
                            <ReactSVG
                              src={socialLinksMenuItem.socialIcon.url}
                              className={styles['acc-social-icon']}
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {/* socialnetworks end */}
              </Col>
              {/* start desktop menu */}
              {windowObj && windowSize.width > 767 && (
                <Col xs={12} md={6} lg={4}>
                  {footerMenu &&
                    footerMenu.length &&
                    footerMenu.map((footerMainMenuItem) => (
                      <div key={footerMainMenuItem.id}>
                        <span className="d-block border-bottom border-light pb-2 mb-2">
                          <I18nLink
                            href={footerMainMenuItem.pageSlugUrl}
                            isMagentoRoute={0}
                          >
                            <a className="text-white h3 font-weight-500 text-uppercase">
                              {' '}
                              {footerMainMenuItem.menuTitle}{' '}
                            </a>
                          </I18nLink>
                        </span>
                        <ul>
                          {' '}
                          {footerMainMenuItem.footerSubMenus.length &&
                            footerMainMenuItem.footerSubMenus.map(
                              (footerSubMenuItem) => (
                                <li
                                  className="p-0 h3 font-weight-400 border-bottom border-light pb-2 mb-2"
                                  key={footerSubMenuItem.id}
                                >
                                  <I18nLink
                                    href={footerSubMenuItem.pageSlugUrl}
                                    isMagentoRoute={0}
                                  >
                                    <a className="text-white">
                                      {' '}
                                      {footerSubMenuItem.menuTitle}{' '}
                                    </a>
                                  </I18nLink>
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                    ))}
                </Col>
              )}
              {/* end desktop menu */}
            </Row>
          </Container>
        </section>
        <div
          className={`${styles['footer-finalRow']} d-inline-flex w-100 d-flex justify-content-xxl-between py-5 px-4`}
        >
          <Container fluid>
            <Row
              className={`${
                windowObj && windowSize.width <= 1024
                  ? ''
                  : 'justify-content-between'
              } ${styles['acc-footer-bottom-bar']}`}
            >
              {otherMenu && otherMenu.length > 0 ? (
                <Col xs={12} xl={12} className="col-xxxl-7">
                  <ul
                    className={`${styles['footer-mainMenu']} pb-4 pb-xl-0 p-0`}
                  >
                    {otherMenu[0].footerSubMenus.map((footerMenuItem) => (
                      <li
                        className="text-transform font-size-md"
                        key={footerMenuItem.id}
                      >
                        {footerMenuItem &&
                        footerMenuItem.externalLink !== true ? (
                          <I18nLink
                            href={footerMenuItem.pageSlugUrl}
                            isMagentoRoute={0}
                          >
                            <a
                              aria-label="link"
                              target={
                                footerMenuItem.openInNewTab === true
                                  ? '_blank'
                                  : '_self'
                              }
                              rel="noopener noreferrer"
                            >
                              {footerMenuItem.menuTitle}
                            </a>
                          </I18nLink>
                        ) : footerMenuItem.menuTitle === 'NEWS SIGNUP' ? (
                          <a
                            href={void 0}
                            aria-label="link"
                            prefetch="false"
                            onClick={(e) => clickOnFocus()}
                            className={styles.cursorPointer}
                          >
                            {footerMenuItem.menuTitle}
                          </a>
                        ) : (
                          <a
                            href={footerMenuItem.pageSlugUrl}
                            target={
                              footerMenuItem.openInNewTab === true
                                ? '_blank'
                                : '_self'
                            }
                            aria-label="link"
                            prefetch="false"
                            rel="noopener noreferrer"
                          >
                            {footerMenuItem.menuTitle}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </Col>
              ) : null}
              <Col xs={12} xl={12} className="col-xxxl-5">
                <div
                  className={`${
                    windowObj && windowSize.width <= 1024
                      ? ''
                      : 'd-flex align-items-center'
                  } ${
                    windowObj && windowSize.width <= 1399
                      ? ''
                      : 'justify-content-end'
                  }`}
                >
                  {/* start other stores menu */}
                  {otherStoresMenu.length > 0 ? (
                    <ul className={`${styles['footer-country']} p-0`}>
                      {otherStoresMenu.map((otherStoresMenuItem) => (
                        <li
                          key={otherStoresMenuItem.id}
                          className="font-size-md m-0"
                        >
                          <a
                            href={
                              otherStoresMenuItem.menuTitle == 'China'
                                ? void 0
                                : otherStoresMenuItem.linkUrl
                            }
                            target={
                              otherStoresMenuItem.menuTitle != 'China' &&
                              '_blank'
                            }
                            rel="noopener noreferrer"
                            aria-label="link"
                            prefetch="false"
                          >
                            {otherStoresMenuItem.menuTitle}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {/* end other stores menu */}
                  <span
                    className={`${
                      windowObj && windowSize.width <= 1024
                        ? 'border-top border-secondary'
                        : ''
                    } ${
                      styles['footer-copyright']
                    } d-inline-block pt-xl-0 mt-xl-0 pt-2 mt-2 text-primary text-uppercase font-size-md`}
                  >
                    {copyrightText}
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  );
};

export default Footer;
