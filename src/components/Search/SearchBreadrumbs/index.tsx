import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import React from "react";
import { I18nLink } from "@Components/Utilities";

const SearchBreadrumbs = (props) => {
  const { searchSLIData } = props;
  const router = useRouter();
  let selectedFilter = [];
  if (router.query.filter) {
    const filterParm = router.query.filter;
    selectedFilter = filterParm.split("|").filter((x) => x !== "");
  }
  let PageName = "";
  let searchUrl = "";
  const AllFacets = searchSLIData.facets;
  for (let i = 0; i < AllFacets.length; ) {
    if (AllFacets[i].id === "pagetype") {
      PageName = AllFacets[i].values[0].id;
    }
    i += 1;
  }
  if (PageName === "products") {
    PageName = "";
  } else if (PageName === "blogs") {
    PageName = "Blogs";
    if (selectedFilter.length > 0) {
      searchUrl = `/search/blog?keyword=${router.query.keyword}`;
    }
  } else if (PageName === "news") {
    PageName = "Newsroom";
    if (selectedFilter.length > 0) {
      searchUrl = `/search/news?keyword=${router.query.keyword}`;
    }
  } else if (PageName === "videos") {
    PageName = "Videos";
    if (selectedFilter.length > 0) {
      searchUrl = `/search/videos?keyword=${router.query.keyword}`;
    }
  } else if (PageName === "resource") {
    PageName = "Resource Center";
    if (selectedFilter.length > 0) {
      searchUrl = `/search/resourcecenter?keyword=${router.query.keyword}`;
    }
  } else {
    PageName = "";
    searchUrl = "";
  }
  let $href = `/search?keyword=${router.query.keyword}${
    router.query.sort ? `&sort=${router.query.sort}` : ""
  }&filter=`;
  /**
   * ready breadcrumb list compare with selected filter from URL and filter with filter list.
   * genarate href for search with selected all filter item.
   * @param {*} filterItem
   * @param {*} filterIndx
   */
  const returnFilterBreadcrumb = (filterItem, filterIndx) => {
    const isLastItem = selectedFilter.length === filterIndx + 1;
    const curentFilterCatNOption = filterItem.split("-");
    const selectedfilterArr = searchSLIData.facets.find(
      (item) => item.id === curentFilterCatNOption[0],
    );
    const selectedValue = selectedfilterArr.values.find(
      (subbItem) => subbItem.id === curentFilterCatNOption[1],
    );
    let returnOutput;
    if (isLastItem) {
      returnOutput = <a>{selectedValue.name}</a>;
    } else {
      $href += `|${curentFilterCatNOption[0]}-${curentFilterCatNOption[1]}`;
      returnOutput = (
        <I18nLink href={$href}>
          <a>{selectedValue.name}</a>
        </I18nLink>
      );
    }
    return returnOutput;
  };

  return (
    <Row className="mb-3">
      <Col>
        <I18nLink href="/">
          <a>Home</a>
        </I18nLink>
        <span> &gt; </span>
        <I18nLink
          href={`/search?keyword=${router.query.keyword}${
            router.query.sort ? `&sort=${router.query.sort}` : ""
          } `}
        >
          <a>{`"${router.query.keyword}"`}</a>
        </I18nLink>

        {PageName !== "" ? (
          <>
            <span> &gt; </span>
            {searchUrl === "" ? (
              PageName
            ) : (
              <I18nLink href={searchUrl}>
                <a>{PageName}</a>
              </I18nLink>
            )}
          </>
        ) : (
          ""
        )}
        {selectedFilter.length > 0
          ? selectedFilter.map((filterItem, filterIndx) => (
              <React.Fragment key={filterItem}>
                <span> &gt; </span>
                {returnFilterBreadcrumb(filterItem, filterIndx)}
              </React.Fragment>
            ))
          : null}
      </Col>
    </Row>
  );
};
export default SearchBreadrumbs;
