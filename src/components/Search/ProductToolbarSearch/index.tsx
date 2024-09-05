import {
    ButtonGroup,
    Button,
    Row,
    Col,
    Form,
} from 'react-bootstrap';
import React from 'react';
import { IoIosKeypad } from 'react-icons/io';
import { MdFormatListBulleted } from 'react-icons/md';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ProductSuggestions = dynamic(() => import('../ProductSuggestions'));
const SearchBreadrumbs = dynamic(() => import('../SearchBreadrumbs'));

const ProductToolbarSearch = (props) => {
    const router = useRouter();
    const {
        pageInfo, searchSLIData, resultMeta, suggestions, showLoader,
    } = props;
    const selectedShortsQuery = router.query.sort ? router.query.sort.replace(/ /g, '+') : 'globalpop';

    if (selectedShortsQuery === 'globalpop') {
        const targetObj = document.querySelector('select[name="searchSort_by2"]');
        if (targetObj) targetObj.value = 0;
    }
    const deskvListGridView = (viewMode) => {
        let viewParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('view');
            viewParmHref += `${urlParams.toString()}&`;
            querySign = '?';
        }
        if (viewMode === 1) {
            viewParmHref += 'view=list';
            querySign = '?';
        }
        if (viewParmHref === '&') {
            viewParmHref = '';
            querySign = '';
        }
        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: viewParmHref }, (`${asPath}${querySign}${viewParmHref}`), { shallow: true });
    };

    const productShortArr = [
        { key: 'globalpop', key_text: 'Popularity' },
        { key: 'title', key_text: 'Title A - Z' },
        { key: 'title+rev', key_text: 'Title Z - A' },
        { key: 'date', key_text: 'Newest' },
    ];

    const searchListShort = (e) => {
        showLoader(true);
        const targetValue = e.target.value;
        const selectedShort = productShortArr[targetValue].key;

        let shortParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('sort');
            shortParmHref += `${urlParams.toString()}&`;
            querySign = '?';
        }
        shortParmHref += `sort=${selectedShort}`;
        querySign = '?';

        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: shortParmHref }, (`${asPath}${querySign}${shortParmHref}`), { shallow: true });
    };
    const curPath = router.asPath;
    const PageNameArr = curPath.split(/[/?]/);
    const PageName = PageNameArr[3];

    return (
        <section className="acc-product-toolbar">
            {/* breadcrumb start */}
            {/* <SearchBreadrumbs
                searchSLIData={searchSLIData}
            /> */}
            {/* breadcrumb end */}
            {/* sortbar start */}
            <Row>
                {/* mode start */}
                <Col className={`acc-modes ${(PageName === 'news' || PageName === 'blog' || PageName === 'resourcecenter') ? 'd-none' : ''}`}>
                    <ButtonGroup>
                        <Button className={`font-size-lg${!router.query.view ? ' btn-primary' : ' btn-light'}`} onClick={() => deskvListGridView(0)}><IoIosKeypad /></Button>
                        <Button className={`font-size-lg${router.query.view ? ' btn-primary' : ' btn-light'}`} onClick={() => deskvListGridView(1)}><MdFormatListBulleted /></Button>
                    </ButtonGroup>
                </Col>
                {/* mode end */}
                <Col className="d-flex align-items-center">
                    {pageInfo.total && resultMeta.total ? (
                        <span className="font-weight-500 font-size-sm d-block mr-2">
                            {` Items ${pageInfo.current.start + 1} - ${pageInfo.current.start + resultMeta.this_page} of ${resultMeta.total}`}
                        </span>
                    )
                        : (<>&nbsp;</>)}
                </Col>

                <Col xs={3} className="acc-desktop-sort d-flex align-items-center col-xxl-4">
                    <Form.Label className="mr-3 mb-0 white-space-nowrap">Sort By</Form.Label>
                    <Form.Control
                        name="searchSort_by2"
                        as="select"
                        onChange={(e) => { searchListShort(e); }}
                        defaultValue={productShortArr.findIndex(
                            (item) => item.key === selectedShortsQuery,
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
                </Col>
            </Row>
            {/* sortbar end */}

            {/* suggestions start */}
            <ProductSuggestions suggestions={suggestions} />
            {/* suggestions end */}

        </section>
    );
};

export default ProductToolbarSearch;
