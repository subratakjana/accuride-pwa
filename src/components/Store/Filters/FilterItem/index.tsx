import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import { MdClose } from "react-icons/md";
/**
 *
 * @param {{
 *      closeFilterCalBack?: any;
 *      filters?: {
 *          label: string;
 *          count: number;
 *          attribute_code: string;
 *          position: number;
 *          options: {
 *              count: number;
 *              label: string;
 *              value: string;
 *              __typename: string;
 *          }[];
 *          __typename: string;
 *      }[];
 *      selectedFiltersQuery?: any;
 * }} props
 * @return {*}
 */
const FilterItem = (props) => {
  const router = useRouter();
  const { filters, selectedFiltersQuery } = props;

  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const newFilter = filters.map((filterItem) => {
    let selectedFilterLength = 0;
    const newOptions = filterItem.options.map((option) => {
      const index = Object.keys(selectedFiltersQuery).indexOf(
        filterItem.attribute_code,
      );
      let checkedMode = false;
      if (index > -1) {
        const objectKey = Object.keys(selectedFiltersQuery)[index];
        const objectArrayValue = selectedFiltersQuery[objectKey].in;
        const objectArrayLength = selectedFiltersQuery[objectKey].in.length;
        const selectedFilterIndx = objectArrayValue.indexOf(option.value);
        if (selectedFilterIndx > -1) {
          checkedMode = true;
        }
        selectedFilterLength = objectArrayLength;
      }
      const isChecked = { isChecked: checkedMode };
      const newC = { ...option, ...isChecked };
      return newC;
    });
    return { ...filterItem, options: newOptions, selectedFilterLength };
  });
  newFilter.sort((a, b) => a.position - b.position);

  const [openAccordion, setOpenAccordion] = useState(
    /** @type {number | boolean} */ 0,
  );

  /**
   *
   *
   * @param {number} index
   */
  const accordianClickedEvent = (index) => {
    if (openAccordion !== index) {
      setOpenAccordion(index);
    } else {
      setOpenAccordion(false);
    }
  };

  /**
   * @typedef {Record<string, {in: string[];}>} FilterObj
   */
  /**
     * Url param set when filter url exist data with selected filter item.
     * set new url with filter item and update url by router push state with out reloading page.
    /**
     *
     *
     * @param {FilterObj} filterObj
     */
  const filterUrlParamSet = (filterObj) => {
    let filterParmHref = "";
    let querySign = "";
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      console.log({ urlParams });
      urlParams.delete("filter");
      urlParams.delete("p");
      urlParams.delete("o_p");
      filterParmHref += `${urlParams.toString()}`;
      querySign = "?";
      if (filterParmHref !== "") filterParmHref += "&";
    }
    if (Object.keys(filterObj).length > 0) {
      filterParmHref += "filter=";
      querySign = "?";
    }
    Object.entries(filterObj).map((item) => {
      const filterLabel = item[0];
      const filterItem = item[1].in.join();
      filterParmHref += `%7C${filterLabel}-${filterItem}`;
      return filterParmHref;
    });
    const asPath = router.asPath.split("?")[0];
    router.push(
      { pathname: router.pathname, query: filterParmHref },
      `${asPath}${querySign}${filterParmHref}`,
      { shallow: true },
    );
    if (windowSize.width <= 1024)
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * After checked filter options ready filter obj
   */
  const readySelectedFilterObj = () => {
    /** @type {FilterObj} */
    const filterObj = {};
    newFilter.map(
      (item) =>
        item.options.filter((c) => {
          if (c.isChecked) {
            filterObj[item.attribute_code] = filterObj[item.attribute_code]
              ? filterObj[item.attribute_code]
              : { in: [] };
            filterObj[item.attribute_code].in.push(c.value);
          }
          return filterObj;
        }),
      {},
    );

    /** close filter section by props callback */
    props.closeFilterCalBack();
    /** set selected filter object in filter context provider */
    filterUrlParamSet(filterObj);
  };

  /** checked filter state data handling */
  const filterChecked = (event, filterIndex, optionIndex) => {
    const selectedObj = newFilter[filterIndex];
    const selectedOptions = selectedObj.options[optionIndex];
    if (!selectedOptions.isChecked) {
      selectedOptions.isChecked = true;
    } else {
      selectedOptions.isChecked = false;
    }
    readySelectedFilterObj();
  };

  /**
   * clear all selected filter
   */
  const clearAllFilterShort = () => {
    let routerParmHref = "";
    let querySign = "";
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("filter");
      routerParmHref += `${urlParams.toString()}&`;
      querySign = "?";
    }
    if (routerParmHref === "&") {
      routerParmHref = "";
      querySign = "";
    }
    const asPath = router.asPath.split("?")[0];
    router.push(
      { pathname: router.pathname, query: routerParmHref },
      `${asPath}${querySign}${routerParmHref}`,
      { shallow: true },
    );
  };

  return (
    <>
      {windowObj && windowSize.width <= 1024 ? (
        <div className="d-flex mb-3 justify-content-between align-items-center">
          <h2 className="text-primary d-md-none">Refine</h2>
        </div>
      ) : (
        <>
          <header className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="text-primary mb-0 text-uppercase">Refine</h5>
            {Object.keys(selectedFiltersQuery).length > 0 ? (
              <Button
                onClick={() => clearAllFilterShort()}
                variant="primary"
                size="sm"
                className="text-uppercase"
              >
                Clear All
              </Button>
            ) : null}
          </header>
          <>
            {newFilter.map((filter, filterIndex) => (
              <React.Fragment key={filter.attribute_code}>
                {filter.options.map((option, optionIndex) => (
                  <React.Fragment key={option.value}>
                    {option.isChecked ? (
                      <Badge
                        variant="light"
                        className="p-2 d-inline-flex font-size-sm font-weight-400 mr-2 mb-2"
                      >
                        <span className="text-ellipsis w-max-50">
                          <span>{`${filter.label}:`}</span>
                          <span className="text-medium pl-1">
                            {option.label}
                          </span>
                        </span>
                        <MdClose
                          onClick={(e) =>
                            filterChecked(e, filterIndex, optionIndex)
                          }
                          className="ml-1 cursor-pointer"
                        />
                      </Badge>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        </>
      )}
      {windowObj && (
        <Accordion
          className="acc-filter-accordian"
          defaultActiveKey={openAccordion + ""}
        >
          <Form>
            {newFilter.map((filter, filterIndex) => {
              return (
                <Card
                  key={`cat-${filter.attribute_code}`}
                  className={`mb-3 mb-xl-0 border-0 rounded cat-${filter.attribute_code}`}
                >
                  <Card.Header className="card-header p-0 border-0">
                    <Accordion.Toggle
                      onClick={() => accordianClickedEvent(filterIndex)}
                      className={`text-left d-flex justify-content-between ${
                        openAccordion === filterIndex
                          ? "text-primary"
                          : "text-dark"
                      }`}
                      as={Button}
                      block
                      variant="link"
                      eventKey={filterIndex + ""}
                    >
                      <span>
                        {filter.label}
                        {filter.selectedFilterLength > 0 ? (
                          <strong className="ml-2 text-primary">
                            {filter.selectedFilterLength}
                          </strong>
                        ) : (
                          ""
                        )}
                      </span>
                    </Accordion.Toggle>
                  </Card.Header>
                  {
                    <Accordion.Collapse eventKey={filterIndex + ""}>
                      <Card.Body className="px-3 px-xl-0 pb-0 pt-2">
                        {filter.options.map((option, optionIndex) => (
                          <div key={option.value} className="mb-3 item">
                            <Form.Check
                              key={option.value}
                              onChange={(e) =>
                                filterChecked(e, filterIndex, optionIndex)
                              }
                              checked={option.isChecked}
                              custom
                              type="checkbox"
                              id={`filter-checkbox-${filterIndex}-${optionIndex}`}
                              label={`${option.label} (${option.count})`}
                              className="acc-cursor-pointer"
                            />
                          </div>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                  }
                </Card>
              );
            })}
          </Form>
        </Accordion>
      )}
    </>
  );
};
export default FilterItem;
