import { I18nLink } from '@Components/Utilities';
import { AuthContext } from '@Contexts/AuthContext';
import { mobileMenu } from '@Graphql/queriesgraphcms/getMobileMenus.graphql';
import { useQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { ReactSVG } from 'react-svg';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const { cartList, token } = useContext(AuthContext);
  const [navControl, setState] = useState({ navExpanded: false });
  const [mobileSubMenus, setMobileSubMenus] = useState(null);
  let targetObj = false;
  let count = 0;

  const handleToggle = (isOpen, subMenu) => {
    if (isOpen) {
      if (subMenu && subMenu.mobileMenu.length > 0) {
        setMobileSubMenus(subMenu);
      }
    }
  };

  /**
   * for form requird filed stuck under header.
   * with out form required field not fillup submit then scroll and focus
   * the first required field but the field overlap with header.
   * Resolved the issue with this function.
   * implemnt on header to work globally for all form.
   * @param {*} e.
   */
  let lastScrollTop = 0;
  const focusHandle = () => {
    const st = window.scrollY;
    if (st >= lastScrollTop) {
      count += 1;
      if (targetObj && count > 1) {
        targetObj.blur();
      }
    }
    lastScrollTop = st;
  };

  /** remove scroll and mouse down event when mouse down */
  const removeFocusHandle = () => {
    count = 0;
    targetObj.focus();
    targetObj = false;
    window.removeEventListener('mousedown', removeFocusHandle, false);
    window.removeEventListener('scroll', focusHandle, false);
  };

  /** adjust focus for every form field */
  const adjust = (e) => {
    const reletedTarget = e.relatedTarget ? e.relatedTarget.type : false;
    const parentIsForm = e.target.closest('form');
    if (reletedTarget === 'submit' && parentIsForm) {
      setTimeout(() => {
        if (e.target.matches(':focus') && e.target.tagName !== 'button') {
          const targetFocusPos = e.target.getBoundingClientRect();
          window.scrollBy({
            top: targetFocusPos.top - 170,
            left: 0,
            behavior: 'smooth',
          });
          lastScrollTop = window.scrollY;
          targetObj = e.target;
          window.addEventListener('scroll', focusHandle, {
            passive: true,
          });
          window.addEventListener('mousedown', removeFocusHandle);
        }
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener('focusin', adjust);
  });

  const hasTagUrlClick = () => {
    setTimeout(() => {
      const urlContent = window.location.hash.substr(1);
      const urlIdElem = document.getElementById(urlContent);
      if (urlIdElem) {
        urlIdElem.children[0].click();
      }
    }, 1000);
  };

  const hamburger = () => {
    const aspath = router.asPath;
    const mode =
      aspath.includes('orderconfirmation') ||
      aspath.includes('cart') ||
      aspath.includes('payment') ||
      aspath.includes('search') ||
      aspath.includes('search');
    return mode;
  };

  const backbutton = () => {
    const aspath = router.asPath;
    const mode =
      aspath.includes('cart') ||
      aspath.includes('payment') ||
      aspath.includes('search');
    return mode;
  };

  /** navigation expanded state handling */
  const setNavExpanded = (expanded) => {
    setState({
      ...navControl,
      navExpanded: expanded,
    });
  };
  /** navigation close state handling */
  const closeNav = () => {
    setState({
      ...navControl,
      navExpanded: false,
    });
  };

  const [show, setShow] = useState(false);
  const [data, setModalData] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openModal = useCallback((url, e) => {
    handleShow();
    setModalData(url);
    e.preventDefault();
  });

  // API calling to generate mobile menu - menu tab
  let mobileMenuItems = {};
  let mobileMenuAccountItems = {};
  const { loading: loadingMobileMenu, data: dataMobileMenu } = useQuery(
    mobileMenu.loc.source.body,
    {
      variables: {
        languages: 'English',
        pageSlug: ['menu', 'account'],
      },
      operationName: { clientName: 'graphCms' },
    }
  );
  // API calling to generate mobile menu - account tab

  if (loadingMobileMenu) return null;
  if (dataMobileMenu) {
    mobileMenuItems = { ...dataMobileMenu.mobilePagess[0] };
    mobileMenuAccountItems = { ...dataMobileMenu.mobilePagess[1] };
  }
  const navMainMenu = () => {
    return (
      <Nav>
        {mobileMenuItems.mobileMenu.length > 0
          ? mobileMenuItems.mobileMenu.map((subMenu) => (
              <React.Fragment key={subMenu.pageName}>
                {subMenu.mobileMenu.length === 0 ? (
                  <>
                    {subMenu.externalLinkUrl === '0' ? (
                      <a
                        href={subMenu.pageSlug}
                        target={
                          subMenu.openInNewTab === true ? '_blank' : '_self'
                        }
                        aria-label="link"
                        onClick={closeNav}
                        prefetch={false}
                        rel="noopener noreferrer"
                      >
                        {subMenu.pageName}
                      </a>
                    ) : (
                      <>
                        {subMenu.videoUrl === '' ||
                        subMenu.videoUrl === null ? (
                          <I18nLink
                            key={Math.random()}
                            href={subMenu.pageSlug}
                            isMagentoRoute={subMenu.staticLink === '0' ? 0 : 1}
                          >
                            <a
                              href={subMenu.pageSlug}
                              aria-label="link"
                              target={
                                subMenu.openInNewTab === true
                                  ? '_blank'
                                  : '_self'
                              }
                              onClick={closeNav}
                              rel="noreferrer noopener"
                            >
                              {subMenu.pageName}
                            </a>
                          </I18nLink>
                        ) : (
                          <a
                            aria-label="link"
                            className="d-block cursor-pointer"
                            href="#"
                            onClick={(e) => openModal(subMenu, e)}
                          >
                            {subMenu.pageName}
                          </a>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <NavDropdown
                    title={subMenu.pageName}
                    className={`sub-menu ${
                      subMenu.show === false ? 'd-none' : ''
                    }`}
                  >
                    {subMenu.mobileMenu.length > 0
                      ? subMenu.mobileMenu.map((subSubMenu) =>
                          subSubMenu.mobileMenu.length === 0 ? (
                            <React.Fragment key={subSubMenu.pageName}>
                              {subSubMenu.externalLinkUrl === '0' ? (
                                <a
                                  href={subSubMenu.pageSlug}
                                  target={
                                    subSubMenu.openInNewTab === true
                                      ? '_blank'
                                      : '_self'
                                  }
                                  aria-label="link"
                                  onClick={closeNav}
                                  prefetch={false}
                                  rel="noopener noreferrer"
                                >
                                  {subSubMenu.pageName}
                                </a>
                              ) : (
                                <>
                                  {subSubMenu.videoUrl === '' ||
                                  subSubMenu.videoUrl === null ? (
                                    <I18nLink
                                      key={Math.random()}
                                      href={subSubMenu.pageSlug}
                                      isMagentoRoute={
                                        subSubMenu.staticLink === '0' ? 0 : 1
                                      }
                                    >
                                      <a
                                        href={subSubMenu.pageSlug}
                                        aria-label="link"
                                        target={
                                          subSubMenu.openInNewTab === true
                                            ? '_blank'
                                            : '_self'
                                        }
                                        onClick={closeNav}
                                        rel="noreferrer"
                                      >
                                        {subSubMenu.pageName}
                                      </a>
                                    </I18nLink>
                                  ) : (
                                    <a
                                      prefetch={false}
                                      aria-label="link"
                                      className="d-block cursor-pointer"
                                      href="#"
                                      onClick={(e) => openModal(subSubMenu, e)}
                                    >
                                      {subSubMenu.pageName}
                                    </a>
                                  )}
                                </>
                              )}
                            </React.Fragment>
                          ) : (
                            <NavDropdown
                              title={subSubMenu.pageName}
                              className="sub-sub-menu"
                            >
                              {subSubMenu.mobileMenu.length > 0
                                ? subSubMenu.mobileMenu.map((subSubSubMenu) =>
                                    subSubSubMenu.mobileMenu.length === 0 ? (
                                      <React.Fragment
                                        key={subSubSubMenu.pageName}
                                      >
                                        {subSubSubMenu.externalLinkUrl ===
                                        '0' ? (
                                          <a
                                            href={subSubSubMenu.pageSlug}
                                            target={
                                              subSubSubMenu.openInNewTab ===
                                              true
                                                ? '_blank'
                                                : '_self'
                                            }
                                            aria-label="link"
                                            onClick={closeNav}
                                            prefetch={false}
                                            rel="noopener noreferrer"
                                          >
                                            {subSubSubMenu.pageName}
                                          </a>
                                        ) : (
                                          <>
                                            {subSubSubMenu.videoUrl === '' ||
                                            subSubSubMenu.videoUrl === null ? (
                                              <>
                                                <I18nLink
                                                  key={Math.random()}
                                                  href={subSubSubMenu.pageSlug}
                                                  isMagentoRoute={
                                                    subSubSubMenu.staticLink ===
                                                    '0'
                                                      ? 0
                                                      : 1
                                                  }
                                                >
                                                  <a
                                                    href={
                                                      subSubSubMenu.pageSlug
                                                    }
                                                    aria-label="link"
                                                    target={
                                                      subSubSubMenu.openInNewTab ===
                                                      true
                                                        ? '_blank'
                                                        : '_self'
                                                    }
                                                    onClick={() => {
                                                      hasTagUrlClick();
                                                      closeNav();
                                                    }}
                                                    rel="noreferrer noopener"
                                                  >
                                                    {subSubSubMenu.pageName}
                                                  </a>
                                                </I18nLink>
                                              </>
                                            ) : (
                                              <a
                                                prefetch={false}
                                                aria-label="link"
                                                className="d-block cursor-pointer"
                                                href="#"
                                                onClick={(e) =>
                                                  openModal(subSubSubMenu, e)
                                                }
                                              >
                                                {subSubSubMenu.pageName}
                                              </a>
                                            )}
                                          </>
                                        )}
                                      </React.Fragment>
                                    ) : (
                                      <NavDropdown
                                        title={subSubSubMenu.pageName}
                                        className="sub-sub-menu"
                                      >
                                        {subSubSubMenu.mobileMenu.map(
                                          (subSubSubSubMenu) => (
                                            <I18nLink
                                              key={Math.random()}
                                              href={subSubSubSubMenu.pageSlug}
                                              isMagentoRoute={
                                                subSubSubSubMenu.staticLink ===
                                                '0'
                                                  ? 0
                                                  : 1
                                              }
                                            >
                                              <a
                                                href={subSubSubSubMenu.pageSlug}
                                                aria-label="link"
                                                target={
                                                  subSubSubSubMenu.openInNewTab ===
                                                  true
                                                    ? '_blank'
                                                    : '_self'
                                                }
                                                onClick={() => {
                                                  hasTagUrlClick();
                                                  closeNav();
                                                }}
                                                rel="noreferrer noopener"
                                              >
                                                {subSubSubSubMenu.pageName}
                                              </a>
                                            </I18nLink>
                                          )
                                        )}
                                      </NavDropdown>
                                    )
                                  )
                                : null}
                            </NavDropdown>
                          )
                        )
                      : null}
                  </NavDropdown>
                )}
              </React.Fragment>
            ))
          : null}
      </Nav>
    );
  };

  const navAccountMenuNavDropdown = (subMenu) => (
    <NavDropdown
      id={`navId${subMenu.pageName}`}
      key={`ddm-${Math.random()}`}
      title={subMenu.pageName}
      className="sub-menu"
    >
      {subMenu.mobileMenu.length > 0
        ? subMenu.mobileMenu.map((subSubMenu) =>
            subSubMenu.mobileMenu.length === 0 ? (
              <>
                {subSubMenu.externalLinkUrl === '0' ? (
                  <a
                    href={subSubMenu.pageSlug}
                    target={
                      subSubMenu.openInNewTab === true ? '_blank' : '_self'
                    }
                    aria-label="link"
                    onClick={closeNav}
                    prefetch={false}
                    rel="noopener noreferrer"
                  >
                    {subSubMenu.pageName}
                  </a>
                ) : (
                  <>
                    {subSubMenu.videoUrl === '' ||
                    subSubMenu.videoUrl === null ? (
                      <I18nLink
                        key={Math.random()}
                        href={subSubMenu.pageSlug}
                        isMagentoRoute={subSubMenu.staticLink === '0' ? 0 : 1}
                      >
                        <a
                          href={subSubMenu.pageSlug}
                          aria-label="link"
                          target={
                            subSubMenu.openInNewTab === true
                              ? '_blank'
                              : '_self'
                          }
                          onClick={closeNav}
                          rel="noreferrer noopener"
                        >
                          {subSubMenu.pageName}
                        </a>
                      </I18nLink>
                    ) : (
                      <a
                        aria-label="link"
                        className="d-block cursor-pointer"
                        href="#"
                        onClick={(e) => openModal(subSubMenu, e)}
                      >
                        {subSubMenu.pageName}
                      </a>
                    )}
                  </>
                )}
              </>
            ) : (
              <NavDropdown
                id={`nav-id-${subMenu.pageName}`}
                key={`ddm-${Math.random()}`}
                title={subSubMenu.pageName}
                className="sub-sub-menu"
              >
                {subSubMenu.mobileMenu.map((subSubSubMenu) => (
                  <>
                    {subSubSubMenu.externalLinkUrl === '0' ? (
                      <a
                        href={subSubSubMenu.pageSlug}
                        target={
                          subSubSubMenu.openInNewTab === true
                            ? '_blank'
                            : '_self'
                        }
                        aria-label="link"
                        onClick={closeNav}
                        prefetch={false}
                        rel="noopener noreferrer"
                      >
                        {subSubSubMenu.pageName}
                      </a>
                    ) : (
                      <>
                        {subSubSubMenu.videoUrl === '' ||
                        subSubSubMenu.videoUrl === null ? (
                          <I18nLink
                            key={Math.random()}
                            href={subSubSubMenu.pageSlug}
                            isMagentoRoute={
                              subSubSubMenu.staticLink === '0' ? 0 : 1
                            }
                          >
                            <a
                              href={subSubSubMenu.pageSlug}
                              aria-label="link"
                              target={
                                subSubSubMenu.openInNewTab === true
                                  ? '_blank'
                                  : '_self'
                              }
                              onClick={closeNav}
                              rel="noreferrer noopener"
                            >
                              {subSubSubMenu.pageName}
                            </a>
                          </I18nLink>
                        ) : (
                          <a
                            prefetch={false}
                            aria-label="link"
                            className="d-block cursor-pointer"
                            href="#"
                            onClick={(e) => openModal(subSubSubMenu, e)}
                          >
                            {subSubSubMenu.pageName}
                          </a>
                        )}
                      </>
                    )}
                  </>
                ))}
              </NavDropdown>
            )
          )
        : null}
    </NavDropdown>
  );

  return (
    <>
      <div className={styles['acc-header']}>
        <Navbar
          bg="primary"
          expand="xl"
          onToggle={setNavExpanded}
          expanded={navControl.navExpanded}
          className={`justify-content-center align-items-center z-index-4 ${styles['main-nav']}`}
        >
          {/* start hamburger icon */}
          {hamburger() ? null : (
            <Navbar.Toggle
              aria-controls="navbar-nav"
              className={`ml-0 mr-auto ${
                router.asPath.includes(`/${router.query.zone_lang}/checkout`)
                  ? 'd-none'
                  : ''
              }`}
            />
          )}
          {/* end hamburger icon */}
          {backbutton() && cartList > 0 ? (
            <Button
              variant="link"
              className={`${styles['acc-btn-back']} ml-0 mr-auto`}
              onClick={() => router.back()}
            >
              <ReactSVG src="/assets/images/icons/back.svg" />
            </Button>
          ) : null}
          {backbutton() && cartList < 1 ? (
            <I18nLink href="/">
              <Button
                variant="link"
                className={`${styles['acc-btn-back']} ml-0 mr-auto`}
              >
                <ReactSVG src="/assets/images/icons/back.svg" />
              </Button>
            </I18nLink>
          ) : null}

          {/* start logo */}
          <I18nLink href="/">
            <a
              href="/"
              aria-label="accuride-logo"
              tabIndex="-1"
              onKeyPress={() => closeNav()}
              onClick={closeNav}
              rel="noreferrer"
            >
              <Navbar.Brand className="mx-auto">
                <span className="main-logo">
                  <ReactSVG src="/assets/images/accuride-logo.svg" />
                </span>
                {router.asPath.includes('orderconfirmation') ? null : (
                  <span className="logo-icon">
                    <ReactSVG src="/assets/images/accuride-logo-icon.svg" />
                  </span>
                )}
              </Navbar.Brand>
            </a>
          </I18nLink>
          {/* end logo */}

          {/* start collapsed menu */}
          <Navbar.Collapse id="navbar-nav">{navMainMenu()}</Navbar.Collapse>
          {/* end collapsed menu */}

          {/* start header right */}
          {hamburger() ? null : (
            <ul
              className={`mr-0 ml-auto p-0 mb-0 ${styles['header-right']} ${
                router.asPath.includes(`/${router.query.zone_lang}/checkout`)
                  ? 'd-none'
                  : 'd-flex'
              }`}
            >
              <li>
                <I18nLink href="/search">
                  <a
                    href="/search"
                    aria-label="link"
                    onClick={closeNav}
                    tabIndex={0}
                    onKeyPress={() => closeNav()}
                    prefetch={false}
                  >
                    <ReactSVG src="/assets/images/icons/search.svg" />
                  </a>
                </I18nLink>
                {/* start search container */}
                <div className={styles['search-box']}>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      <ReactSVG src="/assets/images/icons/search.svg" />
                    </Button>
                  </Form>
                </div>
                {/* end search container */}
              </li>
              <li>
                <I18nLink href="/checkout/cart">
                  <a
                    href="/checkout/cart"
                    aria-label="link"
                    onClick={closeNav}
                    tabIndex="0"
                    onKeyPress={() => closeNav()}
                    rel="noreferrer"
                  >
                    <ReactSVG src="/assets/images/icons/cart.svg" />
                    {cartList > 0 ? (
                      <span className={styles['customBadge']}>
                        <Badge pill variant="secondary">
                          {cartList}
                        </Badge>
                      </span>
                    ) : (
                      ''
                    )}
                  </a>
                </I18nLink>
              </li>
            </ul>
          )}
          {/* end header right */}
        </Navbar>
      </div>
      {/* modal start */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="md"
        dialogClassName="rounded-0"
      >
        <Modal.Body className="p-3">
          <iframe
            title="accuride"
            width="100%"
            height="100%"
            src={data ? data.videoUrl : ''}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
      {/* modal end */}
    </>
  );
};

export default Header;
