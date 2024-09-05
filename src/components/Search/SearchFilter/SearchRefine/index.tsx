import {
    Button,
    Accordion,
    Card,
    Form,
    Badge,
} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';
import { MdClose } from 'react-icons/md';
import { useRouter } from 'next/router';

const SearchRefine = (props) => {
    const { searchSLIData, showLoader } = props;
    const router = useRouter();
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    let selectedFilter = [];
    if (router.query.filter) {
        const filterParm = router.query.filter;
        selectedFilter = filterParm.split('|').filter((x) => x !== '');
    }
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);

    /** ready n ew filter list compare with url param and filter list */

    let newFilter = searchSLIData.facets.map((filterItem) => {
        let selectedFilterLength = 0;
        const newOptions = filterItem.values.map((option) => {
            const curentUrlOptions = `${filterItem.id}-${option.id}`;
            const isCurentOptionInUrl = selectedFilter.indexOf(curentUrlOptions);
            let checkedMode = false;
            if (isCurentOptionInUrl > -1) {
                checkedMode = true;
                selectedFilterLength += 1;
            }
            const isChecked = { isChecked: checkedMode };
            const newC = { ...option, ...isChecked };
            return newC;
        });
        return { ...filterItem, values: newOptions, selectedFilterLength };
    });

    newFilter = newFilter.filter((item) => (item.name !== 'tab' && item.id !== 'content' && item.id !== 'pagetype'));

    /**
     * Url param set when filter url exist data with selected filter item.
     * set new url with filter item and update url by router push state with out reloading page.
     */
    const filterUrlParamSet = (isClear) => {
        let filterParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('page');
            urlParams.delete('filter');
            filterParmHref += `${urlParams.toString()}`;
            querySign = '?';
            if (selectedFilter.length > 0 && !isClear) {
                filterParmHref += `&filter=%7C${selectedFilter.join('|')}`;
            }
        }

        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: filterParmHref }, (`${asPath}${querySign}${filterParmHref}`), { shallow: true });
        if (window.width <= 1024) window.scrollTo({ top: 0, behavior: 'smooth' });

        /** close filter section by props callback */
        props.closeFilterCalBack();
    };

    /** checked filter state data handling */
    const filterChecked = (filterIndex, optionIndex) => {
        showLoader(true);
        const selectedObj = newFilter[filterIndex];
        const selectedOptions = selectedObj.values[optionIndex];
        if (!selectedOptions.isChecked) {
            selectedOptions.isChecked = true;
            selectedFilter.push(`${selectedObj.id}-${selectedOptions.id}`);
        } else {
            selectedOptions.isChecked = false;
            const spliseData = `${selectedObj.id}-${selectedOptions.id}`;
            selectedFilter = selectedFilter.filter((item) => (item !== spliseData));
        }
        filterUrlParamSet();
    };

    /**
     * clear all selected filter
    */
    const clearAllFilterShort = () => {
        showLoader(true);
        filterUrlParamSet(true);
    };


    const [accordion, setState] = useState({ activeKey: 'p-0' });

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

    /** ready selected filter list from url param and compare with filterlist */
    const returnSelectedFilterList = (filterItem) => {
        const curentFilterCatNOption = filterItem.split('-');
        const selectedfilterArr = newFilter.find(
            (item) => item.id === curentFilterCatNOption[0],
        );
        const selectedValue = selectedfilterArr.values.find(
            (subbItem) => subbItem.id === curentFilterCatNOption[1],
        );
        const selectedfilterIndex = newFilter.findIndex(
            (item) => item.id === curentFilterCatNOption[0],
        );
        const selectedValueIndex = selectedfilterArr.values.findIndex(
            (subbItem) => subbItem.id === curentFilterCatNOption[1],
        );
        return (
            <Badge variant="light" className="p-2 d-inline-flex font-size-sm font-weight-400 mr-2 mb-2">
                <span className="text-ellipsis w-max-50">
                    <span>{`${selectedfilterArr.name}:`}</span>
                    <span className="text-medium pl-1">{selectedValue.name}</span>
                </span>
                <MdClose onClick={() => filterChecked(selectedfilterIndex, selectedValueIndex)} className="ml-1 cursor-pointer" />
            </Badge>
        );
    };
    const searchFromPage = router.pathname.split('/').pop();

    return (
        <>
            {(windowObj && windowSize.width <= 1024)
                ? (
                    <div className="d-flex mb-3 justify-content-between align-items-center">
                        {(searchFromPage !== 'videos' && searchFromPage !== 'resourcecenter') ? <h5 className="text-primary d-md-none">Refine</h5> : ''}
                    </div>
                ) : (
                    <>
                        <header className="d-flex align-items-center justify-content-between mb-3">
                            {(searchFromPage !== 'videos' && searchFromPage !== 'resourcecenter') ? <h5 className="text-primary mb-0 text-uppercase">Refine</h5> : ''}
                            {(Object.keys(selectedFilter).length > 0)
                                ? (
                                    <Button onClick={() => clearAllFilterShort()} variant="primary" size="sm" className="text-uppercase">Clear All</Button>
                                ) : null}
                        </header>
                        {/* selected items start */}
                        <div>
                            {selectedFilter.length > 0 ? (
                                selectedFilter.map((filterItem) => (
                                    <React.Fragment key={filterItem}>
                                        {returnSelectedFilterList(filterItem)}
                                    </React.Fragment>
                                ))
                            ) : null}
                        </div>
                        {/* selected items end */}
                    </>
                )}
            <Accordion className="acc-filter-accordian" defaultActiveKey={accordion.activeKey}>
                <Form>
                    {newFilter.map((filter, filterIndex) => (
                        <React.Fragment key={filter.id}>
                            <Card key={`cat-${filter.id}`} className={`mb-3 mb-xl-0 border-0 rounded cat-${filter.id}`}>
                                <Card.Header className="card-header p-0 border-0">
                                    <Accordion.Toggle onClick={() => accordianClickedEvent(`p-${filterIndex}`)} className={`text-left d-flex justify-content-between ${accordion.activeKey === `p-${filterIndex}` ? 'text-primary' : 'text-dark'}`} as={Button} block variant="link" eventKey={`p-${filterIndex}`}>
                                        <span>
                                            {filter.name}
                                            {filter.selectedFilterLength > 0 ? (
                                                <strong className="ml-2 text-primary">
                                                    {filter.selectedFilterLength}
                                                </strong>
                                            ) : ''}
                                        </span>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={`p-${filterIndex}`}>
                                    <Card.Body className="px-3 px-xl-0 pb-0 pt-2">
                                        {filter.values.map((option, optionIndex) => (
                                            <div key={option.name} className="mb-3 item">
                                                <Form.Check
                                                    onChange={() => filterChecked(
                                                        filterIndex, optionIndex,
                                                    )}
                                                    checked={option.isChecked}
                                                    custom
                                                    type="checkbox"
                                                    id={`filter-checkbox-${filterIndex}-${optionIndex}`}
                                                    label={`${option.name} (${option.count})`}
                                                />
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </React.Fragment>
                    ))}

                </Form>
            </Accordion>
        </>
    );
};
export default SearchRefine;
