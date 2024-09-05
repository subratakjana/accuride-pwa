import dynamic from 'next/dynamic';
// import Container from "react-bootstrap/Container";
// import Alert from "react-bootstrap/Alert";
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Header from '@Components/Header';
// import HeaderDesktop from '@Components/HeaderDesktop';
// import Footer from '@Components/Footer';
import { LoadingIndicator, I18nLink } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';
import { isIE } from 'react-device-detect';
import { getClientIpAPI } from '@Graphql/queries/getClientIP.graphql';
import { whiteListedIP } from '@Graphql/queries/getWhitelistIP.graphql';
// import MaintainceMode from '@Components/Maintenance';
// import { getDetectedLocation } from '@I18n';
// import { ZoneContext } from '@Contexts/ZoneContext';
import useIdleTimeout from '@Hooks/userIdleTimeout';
import { AuthContext } from '@Contexts/AuthContext';
import { refreshCustomerToken } from '@Graphql/queries/refreshCustomerToken.graphql';
import { customerSession } from '@Graphql/queries/customerSession.graphql';
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';
import { setCookie } from '@Hooks/criptoEncodeDecodeCookie';
import { maintenanceBanner } from "@Graphql/queriesgraphcms/maintenanceNotification.graphql";
import MaintenanceNotification from '@Components/MaintenanceNotification';

const Header = dynamic(import('@Components/Header'));
const HeaderDesktop = dynamic(import('@Components/HeaderDesktop'));
const Footer = dynamic(import('@Components/Footer'));
const MaintainceMode = dynamic(import('@PageContent/Maintenance'));
const SignUpBanner = dynamic(() => import('@Components/SignUpBanner'));
const TopMenu = dynamic(() => import('@Components/HeaderDesktop/TopMenu'));

const Layout = (props) => {
  const { setToken, token, notify } = useContext(AuthContext);
  const [maintainceMode, setMaintainceMode] = useState(true);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [browserPopupDismis, setBrowserPopupDismis] = useState();
  // const { zone } = useContext(ZoneContext);
  const router = useRouter();
  const [urlElelement, setUrlElelement] = useState(null);

  /* Handle session out code start */
  const [sessionData, setSessionData] = useState(null);
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [active, setActive] = useState(true);
  const [timeVal, setTimeVal] = useState(null);
  const [maintenanceNotification, setMaintenanceNotification] = useState(false);

  const [getClientIp, { data: clientIp, loading: getIpLoader  }] = useManualQuery(
    getClientIpAPI.loc.source.body,
    {
      skipCache: true,
    }
  );

  const [getWhiteListIp, { data: dataIPList, loading: getWhiteIpLoader }] = useManualQuery(
    whiteListedIP.loc.source.body,
    {
      skipCache: true,
    }
  );

   const [maintainceNotificationFn, { data: dataMaintenanceNotification, loading: loadingMaintenanceNotification }] = useManualQuery(
    maintenanceBanner.loc.source.body,
    {
      skipCache: true,
      operationName: { clientName: "graphCms" },
      onSuccess: (res) => {
        const { data } = res;
        if (data && data?.maintenances[0]?.maintenanceNotificationEnable === true) {
            setMaintenanceNotification(true);
        }
      },
    }
  );

  useEffect(() => {
      getClientIp();
      getWhiteListIp();
      maintainceNotificationFn();
  }, []);
  useEffect(() => {
      if (clientIp && dataIPList && dataIPList?.MpBetterMaintenanceConfig?.general?.enabled) {
          const clientsIP = clientIp.getClientIp.ip;
          const ipList = dataIPList.MpBetterMaintenanceConfig.general.whitelist_ip;
          if (ipList) {
              const ipArr = ipList.split(',');
              const ipCheck = ipArr.includes(clientsIP);
              if (ipCheck === false) {
                  setMaintainceMode(true);
              } else {
                  setMaintainceMode(false);
              }
          } else {
              setMaintainceMode(true);
          }
      } else {
        setMaintainceMode(false);
      } 
  }, [clientIp, dataIPList]);

  useEffect(() => {
    setUrlElelement(window.location.origin);
    if (windowSize.width !== 0) updateWindowObj(true);
    if (isIE) {
      const ccAttr = document.getElementsByClassName('cc-window');
      const getBrowserAlertDiv = document.getElementById('browserAlert');
      if (
        ccAttr ===
        'cc-window cc-floating cc-type-opt-in cc-theme-block cc-bottom cc-left cc-color-override--112419084 cc-invisible'
      ) {
        getBrowserAlertDiv.classList.remove('acc-browser-alert-position');
      } else {
        getBrowserAlertDiv.classList.add('acc-browser-alert-position');
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("load", handleReload);
    return () => {
      window.removeEventListener("load", handleReload);
    };
  }, []);

  const [customerSessionFn, { loading: sessionLoading }] = useManualQuery(
    customerSession.loc.source.body,
    {
      onSuccess: (data) => {
        const res = data.data;
        if (res) {
          setSessionData({
            sessionRemainHour: res.customerSession.session_lifetime,
            sessionPromptMIns: res.customerSession.popup_time,
            // sessionRemainHour: 2,
            // sessionPromptMIns: 1,
          });
        }
      },
    }
  );

  useEffect(() => {
    if (token) {
      setActive(true);
      customerSessionFn().then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, 'error');
          } else {
            notify('Please check your network connection!', 'error');
          }
        }
      });
    } else setActive(false);
  }, [token]);

  const [refreshCustomerTokenFn, { loading: refreshSessionLoader }] =
    useManualQuery(refreshCustomerToken.loc.source.body, {
      onSuccess: (data) => {
        const res = data.data;
        if (res.refreshCustomerToken.token) {
          const getToken = res.refreshCustomerToken.token;
          localStorage.setItem("startTime", Date.now());
          if (getToken) setToken(getToken);
          setCookie("userAuthToken", getToken, 30);
        }
      },
    });
  const handleReload = () => {
    setActive(true);
    reset();
  };
  const handleIdlePrompt = () => {
    setActive(false);
    setOpenSessionModal(true);
  };
  const handleIdle = () => {
    setTimeVal(null);
    setOpenSessionModal(false);
    if (!active) router.replace(`/${router.query.zone_lang}/customer/logout`);
  };
  const onAction = () => {
    if (
      timeVal >= sessionData.sessionPromptMIns * 60 * 1000 &&
      token !== null
    ) {
      setOpenSessionModal(false);
      reset();
    }
  };
  const { getRemainingTime, reset, isLeader } = useIdleTimeout({
    token,
    handleIdlePrompt,
    onIdle: handleIdle,
    idleTime: sessionData && sessionData.sessionRemainHour,
    promptRemain: sessionData && sessionData.sessionPromptMIns,
    onAction,
  });
  // Declare timer that will store the remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeVal(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [getRemainingTime]);
  if (sessionLoading || refreshSessionLoader) return <LoadingIndicator />;
  const stay = () => {
    refreshCustomerTokenFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
    reset();
    isLeader();
    setOpenSessionModal(false);
    setActive(true);
  };
  const handleLogout = () => {
    isLeader();
    router.replace(`/${router.query.zone_lang}/customer/logout`);
    setOpenSessionModal(false);
    setTimeVal(null);
    setActive(false);
  };
  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${(minutes < 10 ? "0" : "") + minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  /* Handle session out code end */

  const browserAlertDismis = () => {
    setBrowserPopupDismis(false);
  };

  return (
    <>
    {(getWhiteIpLoader || getIpLoader || loadingMaintenanceNotification) ? <LoadingIndicator /> : null}
    {maintainceMode ? 
    <div className="d-flex flex-column mh-100 app-content">
      <MaintainceMode />
    </div> :
    <>
      {/* no javascript start */}
      {/* <noscript>
                <Container className="container-md">
                    <div className="mh-100 d-flex align-items-center justify-content-center">
                        <Alert variant="danger" className="text-center">
                            JavaScript is disabled! For full functionality of this site,
                            it is necessary to enable JavaScript. Here are the&nbsp;
                            <a
                                href="https://www.enable-javascript.com/"
                                aria-label="link"
                                rel="noopener noreferrer"
                                target="_blank"
                                className="alert-link"
                            >
                                instructions how to enable JavaScript in your web browser
                            </a>
                            . After enabling JavaScript, please&nbsp;
                            <a
                                href=""
                                aria-label="link"
                                className="alert-link"
                            >
                                click here to reload/refresh the page
                            </a>
                            .
                        </Alert>
                    </div>
                    <style dangerouslySetInnerHTML={{ __html: '.app-content { display: none !important; }' }} />
                </Container>
            </noscript> */}
      {/* no javascript start */}
      {/* top signup banner start */}
      {(router.asPath === '/en-us' ||
        router.asPath === '/en-ca' ||
        router.asPath.includes('/en-us/products') ||
        router.asPath.includes('/en-ca/products') ||
        router.asPath.includes('en-us/checkout') ||
        router.asPath.includes('en-ca/checkout')) && <SignUpBanner />}
      {/* top signup banner end */}
      {/* app section start */}
      <div className="d-flex flex-column mh-100 app-content">
        {/* {(!isBrowser) ? <Header /> : <HeaderDesktop />} */}
        {/* {windowObj && windowSize.width < 1025 ? (
                    <Header />
                ) : (
                    <HeaderDesktop megaMenu={props.megaMenu} />
                )} */}
        {/* to avoid the layout shift - splitted the mobile headers , top and mega menu as separate div */}
        {windowObj && windowSize.width < 1025 && (
          <div className="mobile-top-menu-container">
            <section className="acc-header-topbar bg-dark px-1 px-sm-3">
              <TopMenu topMenu={props.topMenu} />
            </section>
          </div>
        )}
        {windowObj && windowSize.width < 1025 ? (
          <div className={styles['mobile-header-container']}>
            <Header topMenu={props.topMenu} />
          </div>
        ) : (
          <HeaderDesktop megaMenu={props.megaMenu} topMenu={props.topMenu} />
        )}
        {maintenanceNotification && <MaintenanceNotification notificationData={dataMaintenanceNotification.maintenances[0]} environment={(urlElelement === 'https://stage.accuride.com') ? 'stage' : 'prod'} />}
        {urlElelement === 'https://stage.accuride.com' ? (
          <div className="bg-secondary acc-demo-store-banner-stage text-center py-4">
            <p className="m-0 font-size-lg font-weight-bold text-uppercase text-dark">
              This is a demo store. No order will be processed. Please proceed
              to
              <a
                href="https://www.accuride.com/en-us"
                target="blank"
                rel="noopener noreferrer"
                aria-label="link"
              >
                {' '}
                Accuride.com{' '}
              </a>
            </p>
          </div>
        ) : null}

        {/* {!router.asPath.includes("/en-us/checkout/orderconfirmation") &&
                !router.asPath.includes("/en-us/customer/login") ? (
                    <div className="acc-layout-height">{props.children}</div>
                ) : (
                    <div>{props.children}</div>
                )} */}
        {props.children}
        <Footer footerMenu={props.footerMenu} />
      </div>
      {/* {maintainceMode && (
                <div className="d-flex flex-column mh-100 app-content">
                    <MaintainceMode />
                </div>
            )} */}
      {/* Browser Alert start */}
      {isIE ? (
        <div
          className={` ${browserPopupDismis === false ? 'd-none' : 'd-block'}`}
        >
          <div className="acc-browser-alert" id="browserAlert">
            <h2>Browser Alert</h2>
            <p>
              This website is best viewed with browsers such as Chrome, Safari,
              Firefox, and Edge. Using Internet Explorer may not provide the
              best experience. If you believe this message was shown in error,{' '}
              <I18nLink href="/contact/general" isMagentoRoute={0}>
                please let us know.{' '}
              </I18nLink>
            </p>
            <Button
              onClick={browserAlertDismis}
              className="btn btn-dark text-uppercase sens-ok-bttn"
              variant="dark"
            >
              OK
            </Button>
          </div>
        </div>
      ) : null}
      {/* Browser Alert end */}
      {/* Session Time out modal start */}
      <Modal
        show={openSessionModal}
        onHide={handleLogout}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="py-3 px-3 py-sm-3 px-sm-4">
          <h3 className="text-dark ">Are you still there?</h3>
          <p className="text-grey-dark mb-1 mb-sm-1">
            If not, we will close this session in..
            <span className="px-2">{millisToMinutesAndSeconds(timeVal)}</span>
          </p>
        </Modal.Body>
        <Modal.Footer className="px-3 px-sm-4 py-3 h-auto">
          <Button
            variant="secondary"
            onClick={stay}
            className="m-0 ml-2 text-uppercase"
          >
            {"I'M HERE"}
          </Button>
          <Button
            variant="primary"
            onClick={handleLogout}
            className="m-0 ml-2 text-uppercase"
          >
            SIGN OUT
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Session Time out modal end */}
      </>}
    </>
  );
};

export default Layout;
