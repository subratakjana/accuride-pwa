import { useContext } from 'react';
import { Container, Tab, Tabs, Accordion } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import NextImage from 'next/legacy/image';
import { ReactSVG } from 'react-svg';

const HTMLContent = dynamic(() => import('@Components/Utilities/HTMLContent'));

const BgImageTabSection = (props) => {
  const { tabList } = props;
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
          {children}
          {isCurrentEventKey ? (
            <BsChevronUp className="position-absolute top right acc-res-tab-arrow" />
          ) : (
            <BsChevronDown className="position-absolute top right acc-res-tab-arrow" />
          )}
        </Accordion.Toggle>
      </>
    );
  };
  return (
    <>
      {tabList ? (
        <section
          className={`section-padding acc-tab-bg-image ${props.customStyle}`}
        >
          <Container fluid className="p-0">
            <div className="d-none d-xl-block">
              <Tabs id="0">
                {tabList.map((eachTab) => (
                  <Tab
                    key={`tab_${eachTab.id}`}
                    eventKey={eachTab.id}
                    title={eachTab.tabName}
                    className="position-relative"
                  >
                    <article className="acc-tab-text position-absolute text-center">
                      {eachTab.tabBannerSubImage ? (
                        <ReactSVG
                          src={eachTab.tabBannerSubImage.url}
                          className="mx-auto svgWraper acc-bg-img-tab-icon"
                        />
                      ) : null}
                      <h3 className="text-white">{eachTab.tabTitle}</h3>
                      {eachTab.tabDescription ? (
                        <HTMLContent
                          className="m-0 pb-3"
                          content={eachTab.tabDescription.html}
                        />
                      ) : (
                        ''
                      )}
                    </article>

                    <span className="tabImageWraper">
                      <NextImage
                        src={eachTab.tabImage.url}
                        alt=""
                        objectFit="cover"
                        objectPosition="center"
                        layout="fill"
                        className="img"
                      />
                    </span>
                  </Tab>
                ))}
              </Tabs>
            </div>
            <div className="d-xl-none d-block px-3" id="0">
              <Accordion defaultActiveKey="0">
                {tabList.map((eachTab, tabIndex) => (
                  <div
                    key={`tab_${eachTab.id}`}
                    role="button"
                    tabIndex={0}
                    className="acc-custom-res-tab"
                  >
                    <ContextAwareToggle
                      eventKey={tabIndex === 0 ? '0' : `${tabIndex}`}
                    >
                      {eachTab.tabName}
                    </ContextAwareToggle>
                    <Accordion.Collapse
                      className={`tab_${tabIndex}`}
                      eventKey={tabIndex === 0 ? '0' : `${tabIndex}`}
                    >
                      <article className="acc-tab-text text-center bg-light p-2">
                        <span className="tabImageWraperMob">
                          <NextImage
                            src={eachTab.tabImage.url}
                            alt=""
                            objectFit="cover"
                            objectPosition="center"
                            layout="fill"
                            className="img"
                          />
                        </span>

                        <div className="pt-3 w-75 mx-auto">
                          {eachTab.tabBannerSubImage ? (
                            <ReactSVG
                              src={eachTab.tabBannerSubImage.url}
                              className="mx-auto bg-tab-icon svgWraper acc-bg-img-tab-icon"
                            />
                          ) : null}
                          <h3>{eachTab.tabTitle}</h3>
                          {eachTab.tabDescription ? (
                            <HTMLContent
                              className="m-0 pb-3"
                              content={eachTab.tabDescription.html}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </article>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>
      ) : (
        ''
      )}
    </>
  );
};
export default BgImageTabSection;
