import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useWindowDimensions from '@Hooks/windowDimention';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

const SortBy = (props) => {
    const router = useRouter();
    const { selectedShortsQuery } = props;
    const [accordion, setState] = useState({ activeKey: 'p-0' });
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);
    const sortType = [
        {
            name: 'ASC',
            type_text: 'Ascending',
        },
        {
            name: 'DESC',
            type_text: 'Descending',
        },
    ];
    const productShortArr = [
        {
            key: 'position',
            key_text: 'Position',
            types: [...sortType],
        },
        {
            key: 'name',
            key_text: 'Product Name',
            types: [...sortType],
        },
        {
            key: 'price',
            key_text: 'Price',
            types: [...sortType],
        },
    ];

    /** accordian expanded state handling */
    const accordianClickedEvent = (index) => {
        if (accordion.activeKey !== index) {
            setState({
                ...accordion,
                activeKey: index,
            });
        } else {
            setState({
                ...accordion,
                activeKey: false,
            });
        }
    };

    /**
     * Url param set when shorting url exist data with selected filter item.
     * set new url with shorting item and update url by router push state with out reloading page.
     */
    const shortingUrlParamSet = (shortObj) => {
        let shortParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('sort');
            shortParmHref += `${urlParams.toString()}&`;
            querySign = '?';
        }
        if (Object.keys(shortObj).length > 0) {
            shortParmHref += 'sort=';
            querySign = '?';
            const shortKey = Object.keys(shortObj)[0];
            const shortItem = shortObj[shortKey];
            shortParmHref += `${shortKey}-${shortItem}`;
        }
        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: shortParmHref }, (`${asPath}${querySign}${shortParmHref}`), { shallow: true });
        if (windowSize.width < 1024) window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * After checked filter options ready filter obj
    */
    const readySelectedShortObj = (shortingItem, shortingOption) => {
        const shortObj = {};
        shortObj[shortingItem.key] = shortingOption.name;
        /** close filter section by props callback */
        if (windowSize.width < 1024) props.closeFilterCalBack();
        /** set selected filter object in filter context provider */
        shortingUrlParamSet(shortObj);
    };

    /**
     * short item by Ascending and Descending order.
     * array handling and pass data for dynamic url when any option checked.
     * @param {*} shortIndx
     * @param {*} typeIndx
     */
    const checkedForShort = (shortIndx, typeIndx) => {
        const shortingItem = productShortArr[shortIndx];
        const shortingOption = shortingItem.types[typeIndx];
        readySelectedShortObj(shortingItem, shortingOption);
    };

    /** for dekstop version change select field for sorting
     * get selected sorting value and pass the sorting for route query in url.
    */
    const sortByDesktop = (e) => {
        const shortIndx = e.target.value;
        const typeIndx = selectedShortsQuery[Object.keys(selectedShortsQuery)[0]] === 'DESC' ? 1 : 0;
        checkedForShort(shortIndx, typeIndx);
    };
    /** for dekstop version change assending and deccending mode for shorting
     * get selected mode value and pass the value for route query in url.
    */
    const sortByDesktopType = (typeIndx) => {
        const shortIndx = document.querySelector('select[name="sort_by2"]').value;
        checkedForShort(shortIndx, typeIndx);
    };

    const deviceShort = () => (
        <>
            <h2 className="text-primary mb-3 d-md-none">Sort By</h2>
            {/* accordion start */}
            <Accordion className="acc-filter-accordian" defaultActiveKey={accordion.activeKey}>
                <Form>
                    {/* shorting start */}
                    {productShortArr.map((shortItem, shortIndx) => (
                        <Card className="mb-3 border-0 rounded" key={shortItem.key}>
                            <Card.Header className="card-header p-0 border-0">
                                <Accordion.Toggle onClick={() => accordianClickedEvent(`p-${shortIndx}`)} className={`text-left d-flex justify-content-between ${accordion.activeKey === `p-${shortIndx}` ? 'text-primary' : 'text-dark'}`} as={Button} block variant="link" eventKey={`p-${shortIndx}`}>
                                    <span>
                                        {shortItem.key_text}
                                        {Object.keys(selectedShortsQuery)[0] === shortItem.key ? (
                                            <strong className="ml-2 text-primary">
                                                {Object.keys(selectedShortsQuery).length}
                                            </strong>
                                        ) : ''}
                                    </span>

                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`p-${shortIndx}`}>
                                <Card.Body className="px-3 pb-0 pt-2">
                                    <div>
                                        {shortItem.types.map((type, typeIndx) => (
                                            <Form.Check
                                                custom
                                                key={`${type.name}-${shortItem.key}`}
                                                type="radio"
                                                id={`${type.name}-${shortItem.key}`}
                                                className="mb-3"
                                                label={type.type_text}
                                                name="shorting"
                                                checked={
                                                    Object.keys(selectedShortsQuery)[0]
                                                    === shortItem.key
                                                    && selectedShortsQuery[
                                                        Object.keys(selectedShortsQuery)[0]
                                                    ]
                                                    === type.name
                                                }
                                                onChange={
                                                    () => checkedForShort(shortIndx, typeIndx)
                                                }
                                            />
                                        ))}
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                    {/* shorting end */}

                </Form>
            </Accordion>
            {/* accordion end */}
        </>
    );

    const desktopShort = () => (
        <>

            <Col xs={5} className="acc-desktop-sort d-flex align-items-center col-xxl-4">
                <Form.Label className="mr-3 mb-0 white-space-nowrap">Sort By</Form.Label>
                <InputGroup>
                    <Form.Control
                        name="sort_by2"
                        as="select"
                        onChange={(e) => sortByDesktop(e)}
                        defaultValue={productShortArr.findIndex(
                            (item) => item.key === Object.keys(selectedShortsQuery)[0],
                        )}
                    >
                        {productShortArr.map((shortItem, shortIndx) => (
                            <option
                                key={shortItem.key}
                                value={shortIndx}
                            >
                                {shortItem.key_text}
                            </option>
                        ))}
                    </Form.Control>
                    <InputGroup.Append>
                        {selectedShortsQuery[Object.keys(selectedShortsQuery)[0]] === 'DESC'
                            ? (
                                <OverlayTrigger overlay={
                                    <Tooltip>Set Ascending Direction</Tooltip>
                                }
                                >
                                    <Button onClick={() => sortByDesktopType(0)} variant="primary" className="font-size-lg px-2"><IoIosArrowRoundDown /></Button>
                                </OverlayTrigger>
                            ) : (
                                <>
                                    <OverlayTrigger overlay={
                                        <Tooltip>Set Descending Direction</Tooltip>
                                    }
                                    >
                                        <Button onClick={() => sortByDesktopType(1)} variant="primary" className="font-size-lg px-2"><IoIosArrowRoundUp /></Button>
                                    </OverlayTrigger>
                                </>
                            )}

                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </>
    );

    return (
        <>
            {windowObj && windowSize.width < 1024 ? (deviceShort()) : (desktopShort())}
        </>
    );
};
export default SortBy;
