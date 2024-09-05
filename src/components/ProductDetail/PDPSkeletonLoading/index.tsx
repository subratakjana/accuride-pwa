import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useWindowDimensions from '@Hooks/windowDimention';

const PdpLoadingSkeleton = () => {
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);

    return (
        <>
            <Container className="mt-3 mt-xl-5">
                <Row name="acc-product-details">
                    <Col md={6} lg={7} className="mb-4">
                        <div className="mb-2">
                            <Skeleton count={1} height={400} containerClassName="flex-fill" />
                        </div>
                        {
                            (windowObj && windowSize.width >= 768) ? (
                                <div className={`d-flex align-items-center justify-content-center overflow-hidden ${(windowObj && windowSize.width <= 1199 ? 'mx-auto' : '')}`}>
                                    {([1, 2, 3, 4]).map((i) => (
                                        <Skeleton key={i} count={0.9} height={200} width={200} containerClassName="flex-fill" />
                                    ))}
                                </div>
                            ) : null
                        }
                    </Col>
                    <Col md={6} lg={5}>
                        <Skeleton count={2.5} height={16} containerClassName="flex-fill" />
                        <div className="d-flex align-items-center my-5">
                            {([1, 2, 3]).map((i) => (
                                <Skeleton key={i} width={24} height={24} circle="true" className="mr-2" />
                            ))}
                        </div>
                        <Skeleton count={3.5} height={16} containerClassName="flex-fill" />
                        <div className="my-5">
                            <Skeleton height={20} width={70} containerClassName="flex-fill" />
                        </div>
                        <div className="mb-5">
                            <Skeleton height={20} width={300} containerClassName="flex-fill" />
                            <Skeleton height={20} width={300} containerClassName="flex-fill" />
                        </div>
                        <div className="d-flex align-items-center my-3">
                            {([1, 2]).map((i) => (
                                <Skeleton key={i} width={80} height={34} className="mr-2" />
                            ))}
                        </div>
                    </Col>
                </Row>
                <div className="mt-5">
                    <Skeleton count={3.5} height={34} className="mr-2" />
                </div>
                <div className="mt-5 mb-5">
                    <Skeleton count={3.5} height={34} className="mr-2" />
                </div>
            </Container>
        </>
    );
};
export default PdpLoadingSkeleton;
