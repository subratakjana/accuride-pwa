import { useContext, useState, useEffect } from 'react';
import { I18nLink } from '@Components/Utilities';
import {
  Container,
  Tab,
  Tabs,
  Col,
  Row,
  Button,
  Accordion,
  Modal,
} from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import useWindowDimensions from '@Hooks/windowDimention';
import { FiPlus } from 'react-icons/fi';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { RiPlayCircleLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { LoadingIndicator } from '@Components/Utilities';
import NextImage from 'next/legacy/image';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';

const HTMLContent = dynamic(() => import('@Components/Utilities/HTMLContent'), {
  loading: () => <p>...</p>,
});

const CustomTabTitle = ({ icon, text }) => {
  return (
    <>
      {icon && <ReactSVG src={icon} className="acc-tab-title-icon" />}
      <span>{text}</span>
    </>
  );
};

const TabSection = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [dotActive, setDotActive] = useState();
  const { tabList, customStyle, PointerDisplay } = props;
  const [showLoader, setLoader] = useState(false);
  const [activeKey, setActiveKey] = useState('0');
  const [tabActiveKey, setTabActiveKey] = useState(
    tabList && tabList.length && tabList[0].id
  );
  const router = useRouter();

  const tabContentShow = (GetIndex, getItem) => {
    setDotActive(GetIndex);
    vidComplete(getItem);
    setLoader(false);
  };

  const handleSelect = (Section, Length, GetIndex, key) => {
    if (Section === 'tab') {
      setTabActiveKey(key);
    } else if (Length > 1) {
      // NA
    } else {
      setDotActive(`0_${GetIndex}`);
    }
  };

  const handleAccordionChange = (eventKey) => {
    setActiveKey(eventKey);
    if (eventKey > 0) {
      handleTabLogic(eventKey);
    } else {
      handleTabLogic();
    }
    setLoader(false);
  };

  // For the video popup
  const handleClose = () => setShowVideo(false);
  const handleShow = (e) => {
    setShowVideo(true);
    const getVideoUrl = e.target.getAttribute('data-url');
    setVideoUrl(getVideoUrl);
  };

  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <>
        <Accordion.Toggle
          onClick={decoratedOnClick}
          className="btn-block py-3 text-left"
          variant="link"
        >
          {customStyle.includes('acc-market-emergency-recreational-tab') ? (
            <span
              className={`acc-accordion-heading-button-style ${
                isCurrentEventKey && 'active'
              }`}
            >
              {children}
            </span>
          ) : (
            children
          )}
          {isCurrentEventKey ? (
            <BsChevronUp className="position-absolute top right acc-res-tab-arrow" />
          ) : (
            <BsChevronDown className="position-absolute top right acc-res-tab-arrow" />
          )}
        </Accordion.Toggle>
      </>
    );
  };

  // for technical specification videos
  const extractVids =
    tabList.length &&
    tabList
      .map((item) => {
        const vids = item.technicalSpecifications.map(
          (spec) => spec.respectiveProductVideo
        );
        return vids.filter((vid) => vid !== null);
      })
      .flat();
  const newArrayOfVids =
    extractVids &&
    extractVids[0] != undefined &&
    extractVids.map((vid) => ({ id: vid.id, url: vid.url }));

  const getUrlById = (id) => {
    const vid = newArrayOfVids.find((vid) => vid.id === id);
    return vid ? vid.url : null;
  };

  // for technical specification videos
  const vidComplete = (className) => {
    const productVideo = document.querySelector(`.${className}`);
    if (productVideo) {
      setLoader(true);
      const productVideoClasses = productVideo.getAttribute('data-class-added');
      productVideoClasses && productVideo.classList.add(productVideoClasses);
      const productVideoId = productVideo.getAttribute('data-id');
      const productVideoSrc = getUrlById(productVideoId);
      productVideo.src = productVideoSrc;
      const setTimeoutDur = productVideo.classList.contains('played')
        ? 0
        : 1000;
      productVideo.classList.contains('played') && setLoader(false);
      setTimeout(() => {
        productVideo.load();
        productVideo.play();
        productVideo.onplay = function () {
          productVideo.classList.remove('completed');
          productVideo.classList.add('animating');
          setLoader(false);
        };
        productVideo.addEventListener('ended', () => {
          productVideo.classList.remove('animating');
          productVideo.classList.add('completed', 'played');
          productVideo.setAttribute('data-class-added', 'played');
          productVideo.src = '';
        });
        productVideo.addEventListener('waiting', (event) => {
          setLoader(true);
        });
        productVideo.addEventListener('playing', (event) => {
          setLoader(false);
        });
      }, setTimeoutDur);
    }
  };

  useEffect(() => {
    handleTabLogic();

    // update windowSize
    if (windowSize.width !== 0) updateWindowObj(true);

    const pageURL = router.asPath;
    const parts = pageURL.split('/');
    const desiredPart = parts[parts.length - 1];
    if (
      tabList &&
      tabList.length &&
      desiredPart === 'emergency-recreational-vehicle-equipment-storage'
    ) {
      const startHandler = () => {
        console.log('Router change started', tabActiveKey, tabList[0].id);
        setDotActive('');
        setLoader(false);
        /* if (tabActiveKey && (tabActiveKey === tabList[0].id)) {
                } else {
                    setTabActiveKey(tabList[0].id);
                } */
      };

      const completeHandler = () => {
        console.log('Router change completed');
      };

      router.events.on('routeChangeStart', startHandler);
      router.events.on('routeChangeComplete', completeHandler);

      return () => {
        router.events.off('routeChangeStart', startHandler);
        router.events.off('routeChangeComplete', completeHandler);
      };
    }
  }, []);

  const handleTabLogic = (index = 0) => {
    const isFirstTabEmpty =
      tabList.length &&
      tabList[index].tabDescription &&
      tabList[index].tabDescription.text === '';
    const isFirstTabNull =
      tabList.length && tabList[index].tabDescription === null;
    const isTabListEmpty = !tabList.length;
    const isTabListDescriptionEmpty =
      tabList.tabDescription && tabList.tabDescription.text === '';
    const isTabListDescriptionNull = tabList.tabDescription === null;

    if (
      isFirstTabEmpty ||
      isFirstTabNull ||
      (isTabListEmpty &&
        (isTabListDescriptionEmpty || isTabListDescriptionNull))
    ) {
      handleTabEnter('');
    } else {
      handleTabEnter();
    }
  };

  const handleTabEnter = (description) => {
    description === '' || description === null
      ? setDotActive('0_0')
      : setDotActive('');
  };

  const handleTabExit = () => {
    setDotActive('');
  };

  return (
    <>
      {tabList ? (
        <section className={`section-padding acc-tab-section ${customStyle}`}>
          <Container>
            {windowObj && windowSize.width > 1024 ? (
              <Tabs
                onSelect={(key) => handleSelect('tab', 0, 0, key)}
                activeKey={tabActiveKey}
              >
                {tabList.length > 0 ? (
                  tabList.map((eachTab, indexcnt) => (
                    <Tab
                      className={`tab_${indexcnt}`}
                      key={`tab_${eachTab.id}`}
                      eventKey={eachTab.id}
                      title={
                        <CustomTabTitle
                          icon={eachTab?.tabNameImage?.url}
                          text={eachTab?.tabName}
                        />
                      }
                      onEntered={() =>
                        handleTabEnter(
                          eachTab.tabDescription && eachTab.tabDescription.text
                        )
                      }
                      onExit={() => handleTabExit()}
                      mountOnEnter={true}
                      unmountOnExit={true}
                    >
                      <Row className="justify-content-between">
                        <Col lg={6} className="text-center tab-content-sec">
                          {eachTab.technicalSpecifications
                            ? eachTab.technicalSpecifications.map(
                                (eachSpec, indexCnt) => (
                                  <article
                                    key={`art_${eachSpec.id}`}
                                    className={`item-${indexCnt} content-item ${
                                      dotActive === `${indexCnt}_0`
                                        ? 'd-block'
                                        : 'd-none'
                                    }`}
                                  >
                                    <h3>{eachSpec.pageTitle}</h3>
                                    {eachSpec.fullDescription ? (
                                      <HTMLContent
                                        className="m-0"
                                        content={eachSpec.fullDescription.html}
                                      />
                                    ) : (
                                      ''
                                    )}
                                    {eachSpec.videoLink ? (
                                      <div className="acc-tab-video-sec">
                                        <div className="acc-tab-image-holder d-inline-block mb-3 mx-auto position-relative">
                                          <div
                                            className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                                            data-url={eachSpec.videoLink}
                                            onClick={handleShow}
                                            onKeyDown={handleShow}
                                            role="button"
                                            tabIndex={0}
                                          >
                                            {' '}
                                          </div>
                                          <RiPlayCircleLine className="text-white position-absolute acc-video-play-icon" />
                                          <div className="acc-next-img acc-vid-img-tab-sec">
                                            <NextImage
                                              src={`https://img.youtube.com/vi/${eachSpec.videoId}/hqdefault.jpg`}
                                              alt=""
                                              width={267}
                                              height={200}
                                              objectFit="contain"
                                              className="mx-auto"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                    <div className="acc-tab-button-wrap">
                                      {eachSpec.buttonLabel ? (
                                        <I18nLink href={eachSpec.buttonLink}>
                                          <Button
                                            variant="primary"
                                            className={`text-uppercase ${
                                              windowObj &&
                                              windowSize.width < 991
                                                ? 'btn-block'
                                                : ''
                                            }`}
                                          >
                                            {eachSpec.buttonLabel}
                                          </Button>
                                        </I18nLink>
                                      ) : (
                                        ''
                                      )}
                                      {eachSpec.button2Label ? (
                                        <I18nLink href={eachSpec.button2Link}>
                                          <Button
                                            variant="primary"
                                            className={`text-uppercase ml-2 ${
                                              windowObj &&
                                              windowSize.width < 991
                                                ? 'btn-block'
                                                : ''
                                            }`}
                                          >
                                            {eachSpec.button2Label}
                                          </Button>
                                        </I18nLink>
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                    {eachSpec.respectiveProductImage && (
                                      <div className="mt-3 mt-md-4">
                                        <NextImage
                                          src={
                                            eachSpec.respectiveProductImage.url
                                          }
                                          alt={eachSpec.title}
                                          width={
                                            eachSpec.respectiveProductImage
                                              .width
                                          }
                                          height={
                                            eachSpec.respectiveProductImage
                                              .height
                                          }
                                          objectFit="contain"
                                        />
                                      </div>
                                    )}
                                  </article>
                                )
                              )
                            : ''}
                          {eachTab.tabDescription &&
                          eachTab.tabDescription.text !== '' ? (
                            <article
                              className={`content-item ${
                                dotActive === '' ? 'd-block' : 'd-none'
                              }`}
                            >
                              <h3>{eachTab.tabTitle}</h3>
                              <HTMLContent
                                className="m-0"
                                content={eachTab.tabDescription.html}
                              />
                            </article>
                          ) : null}
                        </Col>
                        <Col lg={6} className="tab-image-sec">
                          <div className="acc-homeowner-dots-wrap position-relative d-inline-block">
                            <div className="acc-next-img">
                              <NextImage
                                src={eachTab.tabImage.url}
                                alt={eachTab.tabImage.fileName}
                                width={eachTab.tabImage.width}
                                height={eachTab.tabImage.height}
                                objectFit="contain"
                              />
                            </div>
                            {showLoader === true ? (
                              <LoadingIndicator className="acc-market-video-loader" />
                            ) : (
                              ''
                            )}
                            {eachTab.technicalSpecifications &&
                            PointerDisplay !== 'false'
                              ? eachTab.technicalSpecifications.map(
                                  (eachSpec, indexCnt) => (
                                    <>
                                      {eachSpec.respectiveProductVideo && (
                                        <video
                                          data-id={
                                            eachSpec.respectiveProductVideo.id
                                          }
                                          className={`acc-product-animated-image tabs-${indexcnt}-vid-${indexCnt} ${
                                            dotActive === `${indexCnt}_0`
                                              ? 'd-block'
                                              : 'd-none'
                                          }`}
                                          playsInline
                                        ></video>
                                      )}
                                      <div
                                        key={`tabq_${eachSpec.id}`}
                                        item="1"
                                        tabIndex={0}
                                        role="button"
                                        onClick={() =>
                                          tabContentShow(
                                            `${indexCnt}_0`,
                                            `tabs-${indexcnt}-vid-${indexCnt}`
                                          )
                                        }
                                        onKeyDown={() =>
                                          tabContentShow(
                                            `${indexCnt}_0`,
                                            `tabs-${indexcnt}-vid-${indexCnt}`
                                          )
                                        }
                                        className={`dot dot-${indexCnt} position-absolute rounded-circle ${
                                          dotActive === `${indexCnt}_0`
                                            ? 'active'
                                            : ''
                                        }`}
                                      >
                                        <FiPlus />
                                        {eachSpec.tooltip && (
                                          <span className="acc-dot-tooltip">
                                            {eachSpec.tooltip}
                                          </span>
                                        )}
                                      </div>
                                    </>
                                  )
                                )
                              : ''}
                          </div>
                        </Col>
                      </Row>
                    </Tab>
                  ))
                ) : (
                  <Tab
                    key={`tab_${tabList.id}`}
                    eventKey={tabList.id}
                    title={tabList.tabName}
                    onEntered={() =>
                      handleTabEnter(
                        eachTab.tabDescription && eachTab.tabDescription.text
                      )
                    }
                    onExit={() => handleTabExit()}
                    mountOnEnter={true}
                    unmountOnExit={true}
                  >
                    <Row className="justify-content-between">
                      <Col lg={6} className="text-center tab-content-sec">
                        {tabList.technicalSpecifications
                          ? tabList.technicalSpecifications.map(
                              (eachSpec, indexCnt) => (
                                <article
                                  key={`art_${eachSpec.id}`}
                                  className={`item-${indexCnt} content-item ${
                                    dotActive === `${indexCnt}_${indexCnt}`
                                      ? 'd-block'
                                      : 'd-none'
                                  }`}
                                >
                                  <h3>{eachSpec.pageTitle}</h3>
                                  {eachSpec.fullDescription ? (
                                    <HTMLContent
                                      className="m-0"
                                      content={eachSpec.fullDescription.html}
                                    />
                                  ) : (
                                    ''
                                  )}
                                  {eachSpec.buttonLabel ? (
                                    <I18nLink href={eachSpec.buttonLink}>
                                      <Button
                                        variant="primary"
                                        className={`text-uppercase ${
                                          windowObj && windowSize.width < 991
                                            ? 'btn-block'
                                            : ''
                                        }`}
                                      >
                                        {eachSpec.buttonLabel}
                                      </Button>
                                    </I18nLink>
                                  ) : (
                                    ''
                                  )}
                                  {eachSpec.button2Label ? (
                                    <I18nLink href={eachSpec.button2Link}>
                                      <Button
                                        variant="primary"
                                        className={`text-uppercase ml-2 ${
                                          windowObj && windowSize.width < 991
                                            ? 'btn-block'
                                            : ''
                                        }`}
                                      >
                                        {eachSpec.button2Label}
                                      </Button>
                                    </I18nLink>
                                  ) : (
                                    ''
                                  )}
                                  {eachSpec.respectiveProductImage && (
                                    <div className="mt-3 mt-md-4">
                                      <NextImage
                                        src={
                                          eachSpec.respectiveProductImage.url
                                        }
                                        alt={eachSpec.title}
                                        width={
                                          eachSpec.respectiveProductImage.width
                                        }
                                        height={
                                          eachSpec.respectiveProductImage.height
                                        }
                                        objectFit="contain"
                                      />
                                    </div>
                                  )}
                                </article>
                              )
                            )
                          : ''}
                        {tabList.tabDescription &&
                        tabList.tabDescription.text !== '' ? (
                          <article
                            className={`content-item ${
                              dotActive === '' ? 'd-block' : 'd-none'
                            }`}
                          >
                            <h3>{tabList.tabTitle}</h3>
                            <HTMLContent
                              className="m-0"
                              content={tabList.tabDescription.html}
                            />
                          </article>
                        ) : null}
                      </Col>
                      <Col lg={6} className="tab-image-sec">
                        <div className="acc-homeowner-dots-wrap position-relative d-inline-block">
                          <div className="acc-next-img">
                            <NextImage
                              src={tabList.tabImage.url}
                              alt={tabList.tabImage.fileName}
                              width={tabList.tabImage.width}
                              height={tabList.tabImage.height}
                              objectFit="contain"
                            />
                          </div>
                          {showLoader === true ? (
                            <LoadingIndicator className="acc-market-video-loader" />
                          ) : (
                            ''
                          )}
                          {tabList.technicalSpecifications &&
                          PointerDisplay !== 'false'
                            ? tabList.technicalSpecifications.map(
                                (eachSpec, indexCnt) => (
                                  <>
                                    {eachSpec.respectiveProductVideo && (
                                      <video
                                        data-id={
                                          eachSpec.respectiveProductVideo.id
                                        }
                                        onload
                                        alt=""
                                        className={`acc-product-animated-image tab-${
                                          tabList.id
                                        }-vid-${indexCnt} ${
                                          dotActive === `${indexCnt}_0`
                                            ? 'd-block'
                                            : 'd-none'
                                        }`}
                                        playsInline
                                      ></video>
                                    )}
                                    <div
                                      key={`tabq_${eachSpec.id}`}
                                      item="1"
                                      tabIndex={0}
                                      role="button"
                                      onClick={() =>
                                        tabContentShow(
                                          `${indexCnt}_${indexCnt}`,
                                          `tab-${tabList.id}-vid-${indexCnt}`
                                        )
                                      }
                                      onKeyDown={() =>
                                        tabContentShow(
                                          `${indexCnt}_${indexCnt}`,
                                          `tab-${tabList.id}-vid-${indexCnt}`
                                        )
                                      }
                                      className={`dot dot-${indexCnt} position-absolute rounded-circle ${
                                        dotActive === `${indexCnt}_${indexCnt}`
                                          ? 'active'
                                          : ''
                                      }`}
                                    >
                                      <FiPlus />
                                      {eachSpec.tooltip && (
                                        <span className="acc-dot-tooltip">
                                          {eachSpec.tooltip}
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )
                              )
                            : ''}
                        </div>
                      </Col>
                    </Row>
                  </Tab>
                )}
              </Tabs>
            ) : (
              <Accordion
                defaultActiveKey="0"
                className="acc-custom-res-tab"
                activeKey={activeKey}
                onSelect={handleAccordionChange}
              >
                {tabList.length > 0 ? (
                  tabList.map((eachTab, accIndex) => (
                    <div
                      onClick={() =>
                        handleSelect(
                          'accordion',
                          eachTab.technicalSpecifications.length,
                          0
                        )
                      }
                      onKeyDown={() =>
                        handleSelect(
                          'accordion',
                          eachTab.technicalSpecifications.length,
                          0
                        )
                      }
                      key={`tab_${eachTab.id}`}
                      role="button"
                      tabIndex={0}
                    >
                      <ContextAwareToggle
                        eventKey={accIndex === 0 ? '0' : `${accIndex}`}
                      >
                        <CustomTabTitle
                          icon={eachTab?.tabNameImage?.url}
                          text={eachTab?.tabName}
                        />
                      </ContextAwareToggle>
                      <Accordion.Collapse
                        className={`tab_${accIndex}`}
                        eventKey={accIndex === 0 ? '0' : `${accIndex}`}
                      >
                        <Row className="justify-content-center">
                          <Col lg={6} className="tab-image-sec text-center">
                            <div className="acc-homeowner-dots-wrap position-relative pt-3 pt- pb-3 d-inline-block">
                              <div className="acc-next-img">
                                <NextImage
                                  src={eachTab.tabImage.url}
                                  alt={eachTab.tabImage.fileName}
                                  width={eachTab.tabImage.width}
                                  height={eachTab.tabImage.height}
                                  objectFit="contain"
                                />
                              </div>
                              {showLoader === true ? (
                                <LoadingIndicator className="acc-market-video-loader" />
                              ) : (
                                ''
                              )}
                              {eachTab.technicalSpecifications &&
                              PointerDisplay !== 'false'
                                ? eachTab.technicalSpecifications.map(
                                    (eachSpec, indexCnt) => (
                                      <>
                                        {eachSpec.respectiveProductVideo && (
                                          <video
                                            data-id={
                                              eachSpec.respectiveProductVideo.id
                                            }
                                            alt=""
                                            className={`acc-product-animated-image accordions-${
                                              eachTab.id
                                            }-vid-${indexCnt} ${
                                              dotActive === `${indexCnt}_0`
                                                ? 'd-block'
                                                : 'd-none'
                                            }`}
                                            playsInline
                                          ></video>
                                        )}
                                        <div
                                          key={`tabq_${eachSpec.id}`}
                                          item="1"
                                          tabIndex={indexCnt}
                                          role="button"
                                          onClick={() =>
                                            tabContentShow(
                                              `${indexCnt}_0`,
                                              `accordions-${eachTab.id}-vid-${indexCnt}`
                                            )
                                          }
                                          onKeyDown={() =>
                                            tabContentShow(
                                              `${indexCnt}_0`,
                                              `accordions-${eachTab.id}-vid-${indexCnt}`
                                            )
                                          }
                                          className={`dot dot-${indexCnt} position-absolute rounded-circle ${
                                            dotActive === `${indexCnt}_0`
                                              ? 'active'
                                              : ''
                                          }`}
                                        >
                                          <FiPlus />
                                          {eachSpec.tooltip && (
                                            <span className="acc-dot-tooltip">
                                              {eachSpec.tooltip}
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    )
                                  )
                                : ''}
                            </div>
                          </Col>
                          <Col
                            lg={6}
                            className="text-center tab-content-sec pb-5 pb-lg-0 p-3"
                          >
                            {eachTab.technicalSpecifications
                              ? eachTab.technicalSpecifications.map(
                                  (eachSpec, indexCnt) => (
                                    <article
                                      key={`art_${eachSpec.id}`}
                                      className={`item-${indexCnt} content-item ${
                                        dotActive === `${indexCnt}_0`
                                          ? 'd-block'
                                          : 'd-none'
                                      }`}
                                    >
                                      <h3>{eachSpec.pageTitle}</h3>
                                      {eachSpec.fullDescription ? (
                                        <HTMLContent
                                          className="m-0"
                                          content={
                                            eachSpec.fullDescription.html
                                          }
                                        />
                                      ) : (
                                        ''
                                      )}
                                      {eachSpec.videoLink ? (
                                        <div
                                          onClick={handleShow}
                                          onKeyDown={handleShow}
                                          role="button"
                                          tabIndex={0}
                                          className="acc-tab-video-sec"
                                        >
                                          <div className="acc-tab-image-holder d-inline-block mb-3 mx-auto position-relative">
                                            <div
                                              className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                                              data-url={eachSpec.videoLink}
                                              onClick={handleShow}
                                              onKeyDown={handleShow}
                                              role="button"
                                              tabIndex={0}
                                            >
                                              {' '}
                                            </div>
                                            <RiPlayCircleLine className="text-white position-absolute acc-video-play-icon" />
                                            <div className="acc-next-img acc-vid-img-tab-sec">
                                              <NextImage
                                                src={`https://img.youtube.com/vi/${eachSpec.videoId}/hqdefault.jpg`}
                                                alt=""
                                                width={267}
                                                height={200}
                                                objectFit="contain"
                                                className="mx-auto"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                      <div className="acc-tab-button-wrap">
                                        {eachSpec.buttonLabel ? (
                                          <I18nLink href={eachSpec.buttonLink}>
                                            <Button
                                              variant="primary"
                                              className={`btn text-uppercase ${
                                                windowObj &&
                                                windowSize.width < 768
                                                  ? 'btn-block'
                                                  : ''
                                              }`}
                                            >
                                              {eachSpec.buttonLabel}
                                            </Button>
                                          </I18nLink>
                                        ) : (
                                          ''
                                        )}
                                        {eachSpec.button2Label ? (
                                          <I18nLink href={eachSpec.button2Link}>
                                            <Button
                                              variant="primary"
                                              className={`btn text-uppercase ml-md-2 ${
                                                windowObj &&
                                                windowSize.width < 768
                                                  ? 'btn-block'
                                                  : ''
                                              }`}
                                            >
                                              {eachSpec.button2Label}
                                            </Button>
                                          </I18nLink>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                      {eachSpec.respectiveProductImage && (
                                        <div className="mt-3 mt-md-4">
                                          <NextImage
                                            src={
                                              eachSpec.respectiveProductImage
                                                .url
                                            }
                                            alt={eachSpec.title}
                                            width={
                                              eachSpec.respectiveProductImage
                                                .width
                                            }
                                            height={
                                              eachSpec.respectiveProductImage
                                                .height
                                            }
                                            objectFit="contain"
                                          />
                                        </div>
                                      )}
                                    </article>
                                  )
                                )
                              : ''}
                            {eachTab.tabDescription &&
                            eachTab.tabDescription.text !== '' ? (
                              <article
                                className={`content-item ${
                                  dotActive === '' ? 'd-block' : 'd-none'
                                }`}
                              >
                                <h3>{eachTab.tabTitle}</h3>
                                <HTMLContent
                                  className="m-0"
                                  content={eachTab.tabDescription.html}
                                />
                              </article>
                            ) : null}
                          </Col>
                        </Row>
                      </Accordion.Collapse>
                    </div>
                  ))
                ) : (
                  <Row className="justify-content-center align-items-center">
                    <Col lg={6} className="tab-image-sec text-center">
                      <div className="acc-homeowner-dots-wrap position-relative pb-3 d-inline-block">
                        <div className="acc-next-img">
                          <NextImage
                            src={tabList.tabImage.url}
                            alt={tabList.tabImage.fileName}
                            width={tabList.tabImage.width}
                            height={tabList.tabImage.height}
                            objectFit="contain"
                          />
                        </div>
                        {showLoader === true ? (
                          <LoadingIndicator className="acc-market-video-loader" />
                        ) : (
                          ''
                        )}
                        {tabList.technicalSpecifications &&
                        PointerDisplay !== 'false'
                          ? tabList.technicalSpecifications.map(
                              (eachSpec, indexCnt) => (
                                <>
                                  {eachSpec.respectiveProductVideo && (
                                    <video
                                      data-id={
                                        eachSpec.respectiveProductVideo.id
                                      }
                                      alt=""
                                      className={`acc-product-animated-image accordion-${
                                        eachSpec.id
                                      }-vid-${indexCnt} ${
                                        dotActive === `${indexCnt}_0`
                                          ? 'd-block'
                                          : 'd-none'
                                      }`}
                                      playsInline
                                    ></video>
                                  )}
                                  <div
                                    key={`tabq_${eachSpec.id}`}
                                    item="1"
                                    tabIndex={0}
                                    role="button"
                                    onClick={() =>
                                      tabContentShow(
                                        `${indexCnt}_0`,
                                        `accordion-${eachSpec.id}-vid-${indexCnt}`
                                      )
                                    }
                                    onKeyDown={() =>
                                      tabContentShow(
                                        `${indexCnt}_0`,
                                        `accordion-${eachSpec.id}-vid-${indexCnt}`
                                      )
                                    }
                                    className={`dot dot-${indexCnt} position-absolute rounded-circle ${
                                      dotActive === `${indexCnt}_0`
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <FiPlus />
                                    {eachSpec.tooltip && (
                                      <span className="acc-dot-tooltip">
                                        {eachSpec.tooltip}
                                      </span>
                                    )}
                                  </div>
                                </>
                              )
                            )
                          : ''}
                      </div>
                    </Col>
                    <Col
                      lg={6}
                      className="text-center tab-content-sec pb-5 pb-lg-0 p-3"
                    >
                      {tabList.technicalSpecifications
                        ? tabList.technicalSpecifications.map(
                            (eachSpec, indexCnt) => (
                              <article
                                key={`art_${eachSpec.id}`}
                                className={`item-${indexCnt} content-item ${
                                  dotActive === `${indexCnt}_0`
                                    ? 'd-block'
                                    : 'd-none'
                                }`}
                              >
                                <h3>{eachSpec.pageTitle}</h3>
                                {eachSpec.fullDescription ? (
                                  <HTMLContent
                                    className="m-0"
                                    content={eachSpec.fullDescription.html}
                                  />
                                ) : (
                                  ''
                                )}
                                <div className="acc-tab-button-wrap">
                                  {eachSpec.buttonLabel ? (
                                    <I18nLink href={eachSpec.buttonLink}>
                                      <Button
                                        variant="primary"
                                        className={`text-uppercase ${
                                          windowObj && windowSize.width < 768
                                            ? 'btn-block'
                                            : ''
                                        }`}
                                      >
                                        {eachSpec.buttonLabel}
                                      </Button>
                                    </I18nLink>
                                  ) : (
                                    ''
                                  )}
                                  {eachSpec.button2Label ? (
                                    <I18nLink href={eachSpec.button2Link}>
                                      <Button
                                        variant="primary"
                                        className={`text-uppercase ml-md-2 ${
                                          windowObj && windowSize.width < 768
                                            ? 'btn-block'
                                            : ''
                                        }`}
                                      >
                                        {eachSpec.button2Label}
                                      </Button>
                                    </I18nLink>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                {eachSpec.respectiveProductImage && (
                                  <div className="mt-3 mt-md-4">
                                    <NextImage
                                      src={eachSpec.respectiveProductImage.url}
                                      alt={eachSpec.title}
                                      width={
                                        eachSpec.respectiveProductImage.width
                                      }
                                      height={
                                        eachSpec.respectiveProductImage.height
                                      }
                                      objectFit="contain"
                                    />
                                  </div>
                                )}
                              </article>
                            )
                          )
                        : ''}
                      {tabList.tabDescription &&
                      tabList.tabDescription.text !== '' ? (
                        <article
                          className={`content-item ${
                            dotActive === '' ? 'd-block' : 'd-none'
                          }`}
                        >
                          <h3>{tabList.tabTitle}</h3>
                          <HTMLContent
                            className="m-0"
                            content={tabList.tabDescription.html}
                          />
                        </article>
                      ) : null}
                    </Col>
                  </Row>
                )}
              </Accordion>
            )}
          </Container>
          <Modal
            size="md"
            show={showVideo}
            onHide={handleClose}
            className="acc-custom-modal"
          >
            <Modal.Body className="text-center">
              <iframe
                width="100%"
                height="420"
                src={videoUrl}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal.Body>
          </Modal>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default TabSection;
