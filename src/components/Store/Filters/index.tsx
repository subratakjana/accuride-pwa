import { useState, useEffect, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useRouter } from 'next/router';
import useWindowDimensions from '@Hooks/windowDimention';

const FilterItem = dynamic(() => import('./FilterItem'));
const SortBy = dynamic(() => import('./SortBy/SortBy'));

const Filters = (
  /** @type {{ filters: any; selectedFiltersQuery: any; selectedShortsQuery: any; }} */ props
) => {
  const { filters, selectedFiltersQuery, selectedShortsQuery } = props;
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  /** tap refine product button, open filter panel from right side */
  const [filterBox, stateSet] = useState(false);

  const openFilterBox = useCallback(() => {
    const stickyFilter = document.querySelector('.stickyFilter');
    stateSet(true);
    stickyFilter?.classList.add('openFilter');
  }, []);

  /** close filter by tap close icon from header */
  const closeFilter = () => {
    const stickyFilter = document.querySelector('.stickyFilter');
    stateSet(false);
    stickyFilter?.classList.remove('openFilter');
  };

  /**
   * clear all selected filter
   */
  const clearAllFilterShort = useCallback(() => {
    const asPath = router.asPath.split('?')[0];
    router.push({ pathname: router.pathname }, `${asPath}`, {
      shallow: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router]);

  return (
    <>
      <Container className="acc-product-filter p-0">
        <div className="p-3 bg-primary d-xl-none">
          <Button
            variant="light"
            onClick={() => openFilterBox()}
            size="lg"
            block
            className="rounded text-primary text-uppercase"
          >
            Refine Products
          </Button>
        </div>
        <div className={`acc-filter-wrap ${filterBox ? 'openFilterBox' : ''}`}>
          {/* header start */}
          {windowObj && windowSize.width <= 1024 ? (
            <div className="acc-filter-header">
              <Button
                aria-label="refine-panel-close"
                className="acc-filter-close"
                variant="outline-primary"
                onClick={() => closeFilter()}
              >
                <ReactSVG
                  src="/assets/images/icons/close.svg"
                  className="acc-filter-close-icon"
                />
              </Button>
              <I18nLink href="/">
                <a aria-label="link" className="logo-icon">
                  <ReactSVG
                    className="fill-white acc-filter-logo-icon"
                    src="/assets/images/accuride-logo-icon.svg"
                  />
                </a>
              </I18nLink>

              {Object.keys(selectedFiltersQuery).length > 0 ||
              Object.keys(selectedShortsQuery).length > 0 ? (
                <Button
                  onClick={() => clearAllFilterShort()}
                  variant="link"
                  className="text-white p-0"
                  size="lg"
                >
                  Reset
                </Button>
              ) : (
                ''
              )}
            </div>
          ) : null}
          {/* header end */}

          {/* content start */}
          <div className="acc-filter-body">
            <Tab.Container id="left-tabs-example" defaultActiveKey="refine">
              <Row
                className={windowObj && windowSize.width <= 1024 ? 'h-100' : ''}
                noGutters
              >
                {windowObj && windowSize.width <= 1024 ? (
                  <Col className="acc-filter-menu">
                    <Nav variant="pills" className="d-block">
                      <Nav.Item>
                        <Nav.Link eventKey="refine">
                          <ReactSVG src="/assets/images/icons/filter.svg" />
                          <span className="d-block">Refine</span>
                          <Badge pill variant="secondary">
                            {Object.keys(selectedFiltersQuery).length}
                          </Badge>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="sort">
                          <ReactSVG src="/assets/images/icons/sort.svg" />
                          <span className="d-block">Sort By</span>
                          <Badge pill variant="secondary">
                            {Object.keys(selectedShortsQuery).length}
                          </Badge>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                ) : null}
                <Col className=" bg-white">
                  <Tab.Content className="acc-filter-content p-3 p-xl-0">
                    <Tab.Pane eventKey="refine">
                      <FilterItem
                        selectedFiltersQuery={selectedFiltersQuery}
                        filters={filters}
                        closeFilterCalBack={closeFilter}
                      />
                    </Tab.Pane>

                    {windowObj && windowSize.width <= 1024 ? (
                      <Tab.Pane eventKey="sort">
                        <SortBy
                          selectedShortsQuery={selectedShortsQuery}
                          closeFilterCalBack={closeFilter}
                        />
                      </Tab.Pane>
                    ) : null}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
          {/* content end */}
        </div>
      </Container>
    </>
  );
};

export default memo(Filters);
