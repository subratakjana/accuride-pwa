import {
    useState, useEffect,
} from 'react';
import {
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import useWindowDimensions from '@Hooks/windowDimention';
import Skeleton from 'react-loading-skeleton';

const SearchSkeletonLoader = (props) => {
    const { isListView, pageName } = props;
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);

    return (
        <>
            <Container className="acc-products-wrap acc-search-wrap pt-xl-4">
                <h1 className="text-uppercase mt-0 d-none d-xl-block pt-0 pb-3 mb-4 border-bottom border-light">
                    <Skeleton height={25} count={0.75} />
                </h1>
                <Row>
                    <Col xs={{ order: 2, span: 12 }} className="px-xl-3 px-0" />
                    <Col xs={{ order: 1, span: 12 }} xl={{ order: 2 }} className="stickyFilter border-light acc-product-sidebar px-0 px-xl-3">
                        {(windowObj && windowSize.width <= 1024) ? (
                            <div className="p-3 bg-primary">
                                <Skeleton height={44} />
                            </div>
                        ) : (
                            <>
                                <h5 className="mb-3"><Skeleton height={27} /></h5>
                                <div className="d-flex justify-content-between py-2">
                                    <Skeleton count={0.75} containerClassName="flex-fill" />
                                    <Skeleton width={16} circle="true" />
                                </div>
                                {[1, 2].map((i) => (
                                    <div className="d-flex mb-3" key={i}>
                                        <Skeleton width={16} circle="true" containerClassName="flex-none mr-3" />
                                        <Skeleton count={0.50} containerClassName="flex-fill" />
                                    </div>
                                ))}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                    <div className="d-flex justify-content-between py-2" key={i}>
                                        <Skeleton count={0.75} containerClassName="flex-fill" />
                                        <Skeleton width={16} circle="true" />
                                    </div>
                                ))}
                                <h5 className="mt-4"><Skeleton height={27} /></h5>
                                <Skeleton count="0.50" />
                            </>
                        )}
                    </Col>
                    <Col xs={{ order: 3, span: 12 }} xl={{ order: 3 }} className="pl-xl-3 px-0">
                        <Container>
                            {(windowObj && windowSize.width > 1024) ? (
                                <>
                                    <div className="acc-product-toolbar mb-5">
                                        <Row>
                                            <Col className="acc-modes d-flex">
                                                <Skeleton width={150} height={30} containerClassName="mr-2" />
                                                <Skeleton width={150} height={30} containerClassName="mr-2" />
                                                <Skeleton width={150} height={30} containerClassName="mr-2" />
                                                <Skeleton width={150} height={30} containerClassName="mr-2" />
                                                <Skeleton width={150} height={30} />
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col>
                                            <Skeleton count={1} />
                                        </Col>
                                        <Col>
                                            <Skeleton count={1} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Skeleton count={1} height={60} />
                                        </Col>
                                    </Row>
                                </>
                            ) : null}
                            {(pageName === 'blog' || pageName === 'news' || pageName === 'resource') ? (
                                <div className="section-padding pt-xl-3">
                                    {(windowObj && windowSize.width <= 1024) ? (
                                        <Row className="px-2 mb-4">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Col xs={6} key={i} className="mb-2 px-2"><Skeleton height={36} count={1} /></Col>
                                            ))}
                                        </Row>
                                    ) : null}
                                    <Row className="px-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                            <Col xs={12} key={i} className={`mb-3 ${(windowObj && windowSize.width <= 575) ? 'text-center' : 'd-flex align-items-center'}`}>
                                                <div>
                                                    <Skeleton height={150} width={200} />
                                                </div>
                                                <div className={`ml-3 ${(windowObj && windowSize.width <= 575) ? 'pt-2 pb-4' : 'flex-1'}`}>
                                                    <Skeleton count={0.75} />
                                                    <Skeleton count={4.5} />
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            ) : null }
                            {(pageName === 'product' || pageName === 'video') ? (
                                <div className="section-padding pt-xl-3">
                                    {(windowObj && windowSize.width <= 1024) ? (
                                        <Row className="px-2">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Col xs={6} key={i} className="mb-2 px-2"><Skeleton height={36} count={1} /></Col>
                                            ))}
                                        </Row>
                                    ) : null}
                                    <Row className="px-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                            <Col xs={6} sm={4} xl={isListView ? '12' : ''} key={i} className={`acc-product-block mb-3 px-2 ${isListView ? 'col-xxl-12 d-flex flex-row align-items-start' : 'col-xxl-3'}`}>
                                                <div className={`position-relative w-100 ${isListView ? 'mr-4' : 'mb-3'}`}>
                                                    <Skeleton height={248} />
                                                </div>
                                                <div className={`flex-1 ${isListView ? 'mr-3' : ''}`}>
                                                    <Skeleton count={0.50} />
                                                    <Skeleton count={1.25} />
                                                </div>
                                                <div className={`${isListView ? 'flex-none acc-product-btns' : 'w-100'}`}>
                                                    <div className={`d-flex w-100 ${isListView ? 'flex-column' : ''}`}>
                                                        <Skeleton containerClassName="mt-3 mr-1 flex-fill" height={32} />
                                                        <Skeleton containerClassName="mt-3 ml-1 flex-fill" height={32} />
                                                    </div>
                                                    <h6 className={`${isListView ? 'mt-2 mb-0' : 'mt-3'}`}><Skeleton count={0.25} /></h6>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            ) : null }
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default SearchSkeletonLoader;
