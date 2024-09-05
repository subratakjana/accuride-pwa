import { I18nLink } from "@Components/Utilities";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const SearchMenu = (props) => {
  const { data, keyWord } = props;
  const router = useRouter();
  const pageName = router.route.split("/").slice(-1)[0];
  let AllData = [];
  if (data.length !== 0) {
    const GetTotalArrParse = JSON.parse(data);
    const AllFacets = GetTotalArrParse.facets ? GetTotalArrParse.facets : [];
    for (let i = 0; i < AllFacets.length; ) {
      if (AllFacets[i].id === "pagetype") {
        AllData = AllFacets[i].values;
      }
      i += 1;
    }
  }
  let ProductArr = [];
  let BlogArr = [];
  let NewsArr = [];
  let VideosArr = [];
  let ResourceCenterArr = [];

  if (AllData.length !== 0) {
    for (let i = 0; i < AllData.length; ) {
      if (AllData[i].id === "products") {
        ProductArr = AllData[i];
      }
      if (AllData[i].id === "blogs") {
        BlogArr = AllData[i];
      }
      if (AllData[i].id === "news") {
        NewsArr = AllData[i];
      }
      if (AllData[i].id === "videos") {
        VideosArr = AllData[i];
      }
      if (AllData[i].id === "resource") {
        ResourceCenterArr = AllData[i];
      }
      i += 1;
    }
  }
  if (AllData.length > 0 && pageName === "search" && ProductArr.length === 0) {
    if (BlogArr.count > 0) {
      window.location.replace(
        `/${router.query.zone_lang}/search/blog?keyword=${keyWord}`,
      );
    } else if (NewsArr.count > 0) {
      window.location.replace(
        `/${router.query.zone_lang}/search/news?keyword=${keyWord}`,
      );
    } else if (VideosArr.count > 0) {
      window.location.replace(
        `/${router.query.zone_lang}/search/videos?keyword=${keyWord}`,
      );
    } else if (ResourceCenterArr.count > 0) {
      window.location.replace(
        `/${router.query.zone_lang}/search/resourcecenter?keyword=${keyWord}`,
      );
    }
  } else if (
    AllData.length > 0 &&
    pageName === "blog" &&
    (BlogArr.count === 0 || BlogArr.count === undefined)
  ) {
    window.location.replace(
      `/${router.query.zone_lang}/search?keyword=${keyWord}`,
    );
  } else if (
    AllData.length > 0 &&
    pageName === "news" &&
    (NewsArr.count === 0 || NewsArr.count === undefined)
  ) {
    window.location.replace(
      `/${router.query.zone_lang}/search?keyword=${keyWord}`,
    );
  } else if (
    AllData.length > 0 &&
    pageName === "videos" &&
    (VideosArr.count === 0 || VideosArr.count === undefined)
  ) {
    window.location.replace(
      `/${router.query.zone_lang}/search?keyword=${keyWord}`,
    );
  } else if (
    AllData.length > 0 &&
    pageName === "resourcecenter" &&
    (ResourceCenterArr.count === 0 || ResourceCenterArr.count === undefined)
  ) {
    window.location.replace(
      `/${router.query.zone_lang}/search?keyword=${keyWord}`,
    );
  }

  return AllData ? (
    <>
      {router.query.keyword && router.query.keyword !== "" ? (
        <h1 className="text-uppercase d-block d-xl-none mt-0 pt-1 pb-1 mb-1 border-bottom border-medium">
          {`Search Results for '${router.query.keyword}'`}
        </h1>
      ) : null}
      <section className="pb-0 pb-xl-4 pt-2 pt-xl-4 pt-lg-0 acc-search-menu">
        {ProductArr.count > 0 ? (
          <I18nLink href={`/search?keyword=${keyWord}`} isMagentoRoute={0}>
            <Button
              variant={
                ProductArr.selected === true ? "primary" : "outline-dark"
              }
              className="rounded-0"
            >
              {ProductArr.name}
              <span>{` (${ProductArr.count})`}</span>
            </Button>
          </I18nLink>
        ) : (
          ""
        )}
        {BlogArr.count > 0 ? (
          <I18nLink href={`/search/blog?keyword=${keyWord}`} isMagentoRoute={0}>
            <Button
              variant={BlogArr.selected === true ? "primary" : "outline-dark"}
              className="rounded-0"
            >
              {BlogArr.name}
              <span>{` (${BlogArr.count})`}</span>
            </Button>
          </I18nLink>
        ) : (
          ""
        )}
        {NewsArr.count > 0 ? (
          <I18nLink href={`/search/news?keyword=${keyWord}`} isMagentoRoute={0}>
            <Button
              variant={NewsArr.selected === true ? "primary" : "outline-dark"}
              className="rounded-0"
            >
              {NewsArr.name}
              <span>{` (${NewsArr.count})`}</span>
            </Button>
          </I18nLink>
        ) : (
          ""
        )}
        {VideosArr.count > 0 ? (
          <I18nLink
            href={`/search/videos?keyword=${keyWord}`}
            isMagentoRoute={0}
          >
            <Button
              variant={VideosArr.selected === true ? "primary" : "outline-dark"}
              className="rounded-0"
            >
              {VideosArr.name}
              <span>{` (${VideosArr.count})`}</span>
            </Button>
          </I18nLink>
        ) : (
          ""
        )}
        {ResourceCenterArr.count > 0 ? (
          <I18nLink
            href={`/search/resourcecenter?keyword=${keyWord}`}
            isMagentoRoute={0}
          >
            <Button
              variant={
                ResourceCenterArr.selected === true ? "primary" : "outline-dark"
              }
              className="rounded-0"
            >
              {ResourceCenterArr.name}
              <span>{` (${ResourceCenterArr.count})`}</span>
            </Button>
          </I18nLink>
        ) : (
          ""
        )}
      </section>
    </>
  ) : (
    ""
  );
};

export default SearchMenu;
